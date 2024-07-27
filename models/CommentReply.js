const mongoose = require('mongoose');
const {Schema} = mongoose;

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
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentLike'
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

const CommentReply = mongoose.model('CommentReply', commentReplySchema);

module.exports = CommentReply;