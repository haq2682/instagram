const Post = require('../models/Post');
const Media = require('../models/Media');

module.exports = {
    add: async (req, res) => {
        const files = req.files;
        try {
            const newPost = new Post();

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
    }
};
