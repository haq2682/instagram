const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    description: {
        type: String,
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;