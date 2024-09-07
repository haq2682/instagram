const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentReplySchema = new Schema({
    description: {
        type: String
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    liked_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const CommentReply = mongoose.model('CommentReply', commentReplySchema);

module.exports = CommentReply;