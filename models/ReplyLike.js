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
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const ReplyLike = mongoose.model('ReplyLike', replyLikeSchema);

module.exports = ReplyLike;