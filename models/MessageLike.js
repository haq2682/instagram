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
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

const MessageLike = mongoose.model('MessageLike', messageLikeSchema);

module.exports = MessageLike;