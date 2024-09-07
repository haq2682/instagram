const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatAdminSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const ChatAdmin = mongoose.model('ChatAdmin', chatAdminSchema);

module.exports = ChatAdmin;