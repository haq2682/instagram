const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentLikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
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

const CommentLike = mongoose.model('CommentLike', commentLikeSchema);

module.exports = CommentLike;