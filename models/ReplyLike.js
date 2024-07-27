const mongoose = require('mongoose');
const {Schema} = mongoose;

const replyLikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentReply'
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

const ReplyLike = mongoose.model('ReplyLike', replyLikeSchema);

module.exports = ReplyLike;