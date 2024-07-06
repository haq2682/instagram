const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatSchema = new Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatMember',
        required: true,
    }],
    group_name: {
        type: String,
    },
    administrators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatAdmin'
    }],
    chat_type: {
        type: String,
        default: 'individual'
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
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

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;