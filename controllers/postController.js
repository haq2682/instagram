const Post = require('../models/Post');
const Media = require('../models/Media');
const User = require('../models/User');
const PostLike = require('../models/PostLike');

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
            const post = await Post.findOne({ _id: id })
            .populate('user media')
            .exec();
            if(!post) {
                return res.status(404).send({message: 'Post not found'});
            }
            res.send(post);
        } catch (error) {
            const statusCode = error.statusCode || 500; 
            res.status(statusCode).json({ message: error.message });
        }
    },
    all: async (req, res) => {
        try {
            const posts = await Post.find({}).populate('user media').exec();
            if(!posts) return res.status(404).json({message: 'No new Posts'}); 
            res.send(posts);
        }
        catch(error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({code: statusCode});
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
                // If postLike does not exist, create a new like
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
                // If postLike exists, remove the like
                await PostLike.deleteOne({ _id: postLike._id });

                user.likedPosts = user.likedPosts.filter(postId => postId.toString() !== post._id.toString());
                await user.save();

                post.liked_by = post.liked_by.filter(userId => userId.toString() !== user._id.toString());
                await post.save();
            }

            return res.sendStatus(200);
        } catch (error) {
            console.error(error); // Log the error for debugging purposes
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};