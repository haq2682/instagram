const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    description: {
        type: String
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentReply'
    }],
    hidden_for: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;