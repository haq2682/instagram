const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatMemberSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const ChatMember = mongoose.model('ChatMember', chatMemberSchema);

module.exports = ChatMember;