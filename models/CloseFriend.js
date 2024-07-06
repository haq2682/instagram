const mongoose = require('mongoose');
const {Schema} = mongoose;

const closedFriendSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friend: {
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

const ClosedFriend = mongoose.model('ClosedFriend', closedFriendSchema);

module.exports = ClosedFriend;