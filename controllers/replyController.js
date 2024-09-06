const Media = require("../models/Media");
const Comment = require("../models/Comment");
const ReplyLike = require("../models/ReplyLike");
const CommentReply = require("../models/CommentReply");
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

function compressVideo(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .videoBitrate(1000)
            .outputOptions([
                '-maxrate 1M',
                '-bufsize 2M'
            ])
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            })
            .save(outputPath);
    });
}

module.exports = {
    add: async (req, res) => {
        try {
            const comment = await Comment.findOne({_id: req.body.comment_id});
            if(!comment) {
                const error = new Error("This comment does not exist");
                error.status = 404;
                throw error;
            }
            const newReply = new CommentReply();
            if(req.body.description) newReply.description = req.body.description || null;
            newReply.comment = req.body.comment_id;
            newReply.author = req.user._id;
            await newReply.save();
            comment.replies.push(newReply._id);
            await comment.save();
            if(req.file) {
                const newMedia = new Media();
                newMedia.fileName = req.file.filename;
                newMedia.originalName = req.file.originalname;
                newMedia.path = '/' + req.file.path;
                newMedia.size = req.file.size;
                if(req.file.mimetype.startsWith('image/')) {
                    newMedia.media_type = 'image';
                }
                else {
                    newMedia.media_type = 'video';
                    newMedia.encoding = req.file.encoding;

                    const inputPath = req.file.path;
                    const outputPath = path.join(path.dirname(inputPath), `compressed_${req.file.filename}`);
                    await compressVideo(inputPath, outputPath);

                    const stats = fs.statSync(outputPath);
                    newMedia.path = `/${outputPath}`;
                    newMedia.fileName = `compressed_${req.file.filename}`;
                    newMedia.size = stats.size;

                    fs.unlinkSync(inputPath);
                }
                newMedia.format = req.file.originalname.substr(-3, 3);
                newMedia.reply = newReply._id;
                await newMedia.save();
                newReply.media = newMedia._id;
                await newReply.save();
            }
            const reply_id = comment.replies.filter(reply => reply._id === newReply._id);
            const reply = await CommentReply.findOne({_id: reply_id}).populate([
                {
                    path: 'media',
                    model: 'Media'
                },
                {
                    path: 'author',
                    model: 'User',
                    populate: [
                        {
                            path: 'profile_picture',
                            model: 'ProfilePhoto'
                        }
                    ]
                },
                {
                    path: 'liked_by',
                    model: 'User',
                    populate: [
                        {
                            path: 'profile_picture',
                            model: 'ProfilePhoto'
                        }
                    ]
                },
            ]);
            return res.status(200).send(reply);
        }
        catch (error) {
            if (error.status === 404) return res.status(404).json({ message: error.message });
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    getRepliesOfComment: async (req, res) => {
        try {
            const comment = await Comment.findOne({ _id: req.params.id }).populate([{
                path: 'replies',
                model: 'CommentReply',
                options: {
                    limit: 5,
                    skip: (req.params.page_number - 1) * 5
                },
                populate: [
                    {
                        path: 'media',
                        model: 'Media'
                    },
                    {
                        path: 'author',
                        model: 'User',
                        populate: [
                            {
                                path: 'profile_picture',
                                model: 'ProfilePhoto'
                            }
                        ]
                    },
                    {
                        path: 'liked_by',
                        model: 'User',
                        populate: [
                            {
                                path: 'profile_picture',
                                model: 'ProfilePhoto'
                            }
                        ]
                    },
                ]
            }]);
            const replies = comment.replies;
            if (!replies || replies.length === 0) {
                const error = new Error("This comment has no replies yet");
                error.status = 404;
                throw error;
            }
            return res.send(replies);
        }
        catch (error) {
            if (error.status === 404) return res.status(404).json({ message: error.message });
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    likeReply: async (req, res) => {
        try {
            const id = req.params.id;
            const reply = await CommentReply.findOne({_id: id});
            if(!reply) {
                const error = new Error("The reply does not exist");
                error.status = 404;
                throw error;
            }
            const user = await User.findOne({_id: req.user._id});
            const replyLike = await ReplyLike.findOne({user: req.user._id, reply: reply._id});

            if(!replyLike) {
                const newLike = new ReplyLike({
                    user: user._id,
                    comment: reply._id
                });
                await newLike.save();

                reply.liked_by.push(user._id);
                await reply.save();
            }
            else {
                await ReplyLike.deleteOne({_id: replyLike._id});

                reply.liked_by = reply.liked_by.filter(userId => userId.toString() !== user._id.toString());
                await reply.save();
            }
            return res.sendStatus(200);
        }
        catch(error) {
            if(error.status === 404) return res.status(404).json({message: error.message});
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    getLikes: async (req, res) => {
        try {
            const reply = await CommentReply.findOne({ _id: req.params.id }).populate([
                {
                    path: 'liked_by',
                    model: 'User',
                    populate: [{
                        path: 'profile_picture',
                        model: 'ProfilePhoto'
                    }]
                }
            ]);
            if (!reply) {
                const error = new Error('The post does not exist');
                error.status = 404;
                throw error;
            }
            const likes = reply.liked_by;
            if (likes.length === 0) {
                const error = new Error('The post has no likes');
                error.status = 404;
                throw error;
            }
            return res.status(200).send(likes);
        }
        catch (error) {
            if (error.status === 404) return res.status(404).json({ message: error.message });
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}