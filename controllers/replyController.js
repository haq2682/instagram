const Media = require("../models/Media");
const Comment = require("../models/Comment");
const ReplyLike = require("../models/ReplyLike");
const CommentReply = require("../models/CommentReply");

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
                }
                newMedia.format = req.file.originalname.substr(-3, 3);
                newMedia.reply = newReply._id;
                await newMedia.save();
                newReply.media = newMedia._id;
                await newReply.save();
            }
            const reply_id = comment.replies.filter(reply => reply._id === newReply._id);
            const reply = await Comment.findOne({_id: reply_id}).populate([
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
                    model: 'ReplyLike',
                    populate: [
                        {
                            path: 'user',
                            model: 'User',
                            populate: [
                                {
                                    path: 'profile_picture',
                                    model: 'ProfilePhoto'
                                }
                            ]
                        }
                    ]
                },
            ]);
            return res.status(200).send(reply);
        }
        catch(error) {
            if(error.status === 404) return res.status(404).json({message: error.message});
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    getRepliesOfComment: async (req, res) => {
        try {
            const comment = await Comment.findOne({_id: req.params.id}).populate([{
                path: 'replies',
                model: 'CommentReply',
                options: {
                    limit: 5,
                    skip: (req.params.page_number - 1)*5
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
                        model: 'ReplyLike',
                        populate: [
                            {
                                path: 'user',
                                model: 'User',
                                populate: [
                                    {
                                        path: 'profile_picture',
                                        model: 'ProfilePhoto'
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }]);
            const replies = comment.replies;
            if(!replies || replies.length === 0) {
                const error = new Error("This comment has no replies yet");
                error.status = 404;
                throw error;
            }
            return res.send(replies);
        }
        catch(error) {
            if(error.status === 404) return res.status(404).json({message: error.message});
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    }
}