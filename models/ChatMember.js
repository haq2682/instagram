const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatMemberSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
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

const ChatMember = mongoose.model('ChatMember', chatMemberSchema);

module.exports = ChatMember;