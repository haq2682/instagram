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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MessageLike'
    }],
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date,
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;