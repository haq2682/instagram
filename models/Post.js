const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    description: {
        type: String,
    },
    media: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    hidden_for: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tagged: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    liked_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    saved_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    shared_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    shared_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
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

module.exports = Post;