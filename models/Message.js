const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema = new Schema({
    description: {
        type: String,
        max: 300
    },
    reply_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MessageLike'
    }],
    seen_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SeenMessage'
    }],
    delivered_to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveredMessage'
    }],
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date,
    }
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;