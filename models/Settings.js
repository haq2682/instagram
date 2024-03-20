const mongoose = require('mongoose');
const {Schema} = mongoose;

const settingsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    push_like: {
        type: Boolean,
        default: true
    },
    push_comment: {
        type: Boolean,
        default: true,
    },
    push_share: {
        type: Boolean,
        default: true,
    },
    push_mention: {
        type: Boolean,
        default: true,
    },
    email_like: {
        type: Boolean,
        default: false
    },
    email_comment: {
        type: Boolean,
        default: false
    },
    email_share: {
        type: Boolean,
        default: false
    },
    email_mention: {
        type: Boolean,
        default: false
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

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;