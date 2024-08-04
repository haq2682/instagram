const Post = require('../models/Post');
const Media = require('../models/Media');
const User = require('../models/User');
const PostLike = require('../models/PostLike');
const SavedPost = require('../models/SavedPost');

module.exports = {
    add: async (req, res) => {
        const files = req.files;
        try {
            const newPost = new Post();
            const user = await User.findOne({_id: req.user._id});

            for (const file of files) {
                let newMedia = new Media();
                newMedia.path = `/${file.path}`;
                newMedia.fileName = file.filename;
                newMedia.originalName = file.originalname;
                newMedia.size = file.size;
                if (file.mimetype.startsWith('image/')) {
                    newMedia.media_type = 'image';
                } else {
                    newMedia.encoding = file.encoding;
                    newMedia.media_type = 'video';
                }
                newMedia.format = file.originalname.substr(-3, 3);
                newMedia.post = newPost._id; 

                await newMedia.save();

                newPost.media.push(newMedia._id);
            }

            newPost.description = req.body.caption || null;
            newPost.user = req.user._id; 

            await newPost.save();
            user.posts.push(newPost._id);
            await user.save();

            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    find: async (req, res) => {
        const id = req.params.id;
        try {
            const post = await Post.findOne({ _id: id }).populate([
                {
                    path: 'media',
                    model: 'Media'
                },
                {
                    path: 'user',
                    model: 'User',
                    populate: [
                        {
                            path: 'profile_picture',
                            model: 'ProfilePhoto',
                        }
                    ]
                },
                {
                    path: 'shared_post',
                    model: 'Post',
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
                        },
                        {
                            path: 'media',
                            model: 'Media'
                        }
                    ]
                }
            ]);
            if(!post) {
                const error = new Error('This post does not exist');
                error.status = 404;
                throw error;
            }
            res.send(post);
        } catch (error) {
            if(error.status === 404) return res.status(error.status).json({message: error.message});
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    all: async (req, res) => {
        try {
            const posts = await Post.find({}).populate([
                {
                    path: 'media',
                    model: 'Media'
                },
                {
                    path: 'user',
                    model: 'User',
                    populate: [
                        {
                            path: 'profile_picture',
                            model: 'ProfilePhoto',
                        }
                    ]
                },
                {
                    path: 'shared_post',
                    model: 'Post',
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
                        },
                        {
                            path: 'media',
                            model: 'Media'
                        }
                    ]
                }
            ])
            .sort({created_at: 'desc'})
            .limit(3)
            .skip((req.params.page_number - 1)*3);
            if(posts.length === 0) return res.status(404).json({message: 'No more posts found'}); 
            res.send(posts);
        }
        catch(error) {
            res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    like: async (req, res) => {
        try {
            const id = req.params.id;
            const post = await Post.findOne({ _id: id });
            if (!post) return res.status(404).json({ message: 'The post does not exist' });

            const user = await User.findOne({ _id: req.user._id });
            const postLike = await PostLike.findOne({ user: req.user._id, post: post._id });

            if (!postLike) {
                const newLike = new PostLike({
                    user: user._id,
                    post: post._id
                });
                await newLike.save();

                user.likedPosts.push(post._id);
                await user.save();

                post.liked_by.push(user._id);
                await post.save();
            } else {
                await PostLike.deleteOne({ _id: postLike._id });

                user.likedPosts = user.likedPosts.filter(postId => postId.toString() !== post._id.toString());
                await user.save();

                post.liked_by = post.liked_by.filter(userId => userId.toString() !== user._id.toString());
                await post.save();
            }

            return res.sendStatus(200);
        } catch (error) {
            console.error(error); 
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    save: async (req, res) => {
        try {
            const id = req.params.id;
            const post = await Post.findOne({ _id: id });
            if (!post) return res.status(404).json({ message: 'The post does not exist' });

            const user = await User.findOne({ _id: req.user._id });
            const savedPost = await SavedPost.findOne({ user: req.user._id, post: post._id });

            if (!savedPost) {
                const newSave = new SavedPost({
                    user: user._id,
                    post: post._id
                });
                await newSave.save();

                user.saved_posts.push(post._id);
                await user.save();

                post.saved_by.push(user._id);
                await post.save();
            } else {
                await SavedPost.deleteOne({ _id: savedPost._id });
                user.saved_posts = user.saved_posts.filter(postId => postId.toString() !== post._id.toString());
                await user.save();

                post.saved_by = post.saved_by.filter(userId => userId.toString() !== user._id.toString());
                await post.save();
            }

            return res.sendStatus(200);
        } catch (error) {
            console.error(error); 
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    },
    getAllSaved: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user._id}).populate([
                {
                    path: 'saved_posts',
                    model: 'Post',
                    populate: [
                        {
                            path: 'media',
                            model: 'Media'
                        },
                        {
                            path: 'user',
                            model: 'User',
                            populate: [
                                {
                                    path: 'profile_picture',
                                    model: 'ProfilePhoto'
                                }
                            ]
                        },
                        {
                            path: 'shared_post',
                            model: 'Post',
                            populate: [
                                {
                                    path: 'media',
                                    model: 'Media',
                                },
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
                        }
                    ]
                },
            ]);
            if(!user || user.saved_posts.length === 0) {
                const error = new Error("You do not have any saved posts");
                error.status = 404;
                throw error;
            }
            return res.send(user.saved_posts.reverse());
        }
        catch(error) {
            if(error.status === 404) return res.status(error.status).json({message: error.message});
            res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    sharePost: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user._id});
            const post = await Post.findOne({_id: req.body.id});
            const newPost = new Post();
            newPost.description = req.body.caption;
            newPost.user = req.user._id;
            newPost.shared_post = req.body.id;
            newPost.save();
            user.shared_posts.push(req.body.id);
            user.save();
            post.shared_by.push(req.user._id);
            post.save();
            res.status(200).json({message: 'Post shared successfully'});
        }
        catch(error) {
            res.status(error.status).json({message: 'An unknown error occurred'});
        }
    },

    getLikes: async (req, res) => {
        try {
            const post = await Post.findOne({_id: req.params.id}).populate([
                {
                    path: 'liked_by',
                    model: 'User',
                    populate: [{
                        path: 'profile_picture',
                        model: 'ProfilePhoto'
                    }]
                }
            ]);
            if(!post) {
                const error = new Error('The post does not exist');
                error.status = 404;
                throw error;
            }
            const likes = post.liked_by;
            if(likes.length === 0) {
                const error = new Error('The post has no likes');
                error.status = 404;
                throw error;
            }
            return res.status(200).send(likes);
        }
        catch(error) {
            if(error.status === 404) return res.status(404).json({message: error.message});
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    }
};