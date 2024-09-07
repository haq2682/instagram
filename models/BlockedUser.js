const mongoose = require('mongoose');
const {Schema} = mongoose;

const blockedUserSchema = new Schema({
    blocker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    blocked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
});

const BlockedUser = mongoose.model('BlockedUser', blockedUserSchema);

module.exports = BlockedUser;