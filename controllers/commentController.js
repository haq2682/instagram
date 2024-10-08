const Media = require("../models/Media");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const CommentLike = require("../models/CommentLike");
const User = require("../models/User");
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
            const post = await Post.findOne({ _id: req.body.post_id });
            if (!post) {
                const error = new Error("This post does not exist");
                error.status = 404;
                throw error;
            }
            const newComment = new Comment();
            if (req.body.description) newComment.description = req.body.description || null;
            newComment.post = req.body.post_id;
            newComment.author = req.user._id;
            await newComment.save();
            post.comments.push(newComment._id);
            await post.save();
            if (req.file) {
                const newMedia = new Media();
                newMedia.fileName = req.file.filename;
                newMedia.originalName = req.file.originalname;
                newMedia.path = '/' + req.file.path;
                newMedia.size = req.file.size;
                if (req.file.mimetype.startsWith('image/')) {
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
                newMedia.comment = newComment._id;
                await newMedia.save();
                newComment.media = newMedia._id;
                await newComment.save();
            }
            const comment_id = post.comments.filter(comment => comment._id === newComment._id);
            const comment = await Comment.findOne({ _id: comment_id }).populate([
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
                    path: 'likes',
                    model: 'User',
                    populate: [
                        {
                            path: 'profile_picture',
                            model: 'ProfilePhoto'
                        }
                    ]
                },
            ]);
            return res.status(200).send(comment);
        }
        catch (error) {
            if (error.status === 404) return res.status(404).json({ message: error.message });
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    getCommentsOfPost: async (req, res) => {
        try {
            const post = await Post.findOne({ _id: req.params.id }).populate([{
                path: 'comments',
                model: 'Comment',
                options: {
                    limit: 10,
                    skip: (req.params.page_number - 1) * 10
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
                        path: 'likes',
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
            const comments = post.comments;
            if (!comments || comments.length === 0) {
                const error = new Error("This post has no comments yet");
                error.status = 404;
                throw error;
            }
            return res.send(comments);
        }
        catch (error) {
            if (error.status === 404) return res.status(404).json({ message: error.message });
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    likeComment: async (req, res) => {
        try {
            const id = req.params.id;
            const comment = await Comment.findOne({ _id: id });
            if (!comment) {
                const error = new Error("The comment does not exist");
                error.status = 404;
                throw error;
            }
            const user = await User.findOne({ _id: req.user._id });
            const commentLike = await CommentLike.findOne({ user: req.user._id, comment: comment._id });

            if (!commentLike) {
                const newLike = new CommentLike({
                    user: user._id,
                    comment: comment._id
                });
                await newLike.save();

                user.liked_comments.push(comment._id);
                await user.save();

                comment.likes.push(user._id);
                await comment.save();
            }
            else {
                await CommentLike.deleteOne({ _id: commentLike._id });

                user.liked_comments = user.liked_comments.filter(commentId => commentId.toString() !== comment._id.toString());
                await user.save();

                comment.likes = comment.likes.filter(userId => userId.toString() !== user._id.toString());
                await comment.save();
            }
            return res.sendStatus(200);
        }
        catch (error) {
            if (error.status === 404) return res.status(404).json({ message: error.message });
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    getLikes: async (req, res) => {
        try {
            const comment = await Comment.findOne({ _id: req.params.id }).populate([
                {
                    path: 'likes',
                    model: 'User',
                    populate: [{
                        path: 'profile_picture',
                        model: 'ProfilePhoto'
                    }]
                }
            ]);
            if (!comment) {
                const error = new Error('The post does not exist');
                error.status = 404;
                throw error;
            }
            const likes = comment.likes;
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