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
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

const BlockedUser = mongoose.model('BlockedUser', blockedUserSchema);

module.exports = BlockedUser;