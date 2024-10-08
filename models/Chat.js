const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatSchema = new Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    group_name: {
        type: String,
    },
    administrators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    chat_type: {
        type: String,
        default: 'individual'
    },
    profile_picture: {
        type: String
    },
    muted_for: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
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
    },
}, {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;