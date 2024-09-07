const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageLikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const MessageLike = mongoose.model('MessageLike', messageLikeSchema);

module.exports = MessageLike;