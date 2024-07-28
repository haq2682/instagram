const Media = require("../models/Media");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const CommentLike = require("../models/CommentLike");
const CommentReply = require("../models/CommentReply");

module.exports = {
    add: async (req, res) => {
        try {
            const post = await Post.findOne({_id: req.body.post_id});
            if(!post) {
                const error = new Error("This post does not exist");
                error.status = 404;
                throw error;
            }
            const newComment = new Comment();
            if(req.body.description) newComment.description = req.body.description || null;
            newComment.post = req.body.post_id;
            newComment.author = req.user._id;
            await newComment.save();
            post.comments.push(newComment._id);
            await post.save();
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
                newMedia.comment = newComment._id;
                await newMedia.save();
                newComment.media = newMedia._id;
                await newComment.save();
            }
            const comment_id = post.comments.filter(comment => comment._id === newComment._id);
            const comment = await Comment.findOne({_id: comment_id}).populate([
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
                    model: 'CommentLike',
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
            return res.status(200).send(comment);
        }
        catch(error) {
            if(error.status === 404) return res.status(404).json({message: error.message});
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    getCommentsOfPost: async (req, res) => {
        try {
            const post = await Post.findOne({_id: req.params.id}).populate([{
                path: 'comments',
                model: 'Comment',
                options: {
                    limit: 10,
                    skip: (req.params.page_number - 1)*10
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
                        model: 'CommentLike',
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
            const comments = post.comments;
            if(!comments || comments.length === 0) {
                const error = new Error("This post has no comments yet");
                error.status = 404;
                throw error;
            }
            return res.send(comments);
        }
        catch(error) {
            if(error.status === 404) return res.status(404).json({message: error.message});
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    }
}