const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentLikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const CommentLike = mongoose.model('CommentLike', commentLikeSchema);

module.exports = CommentLike;