const mongoose = require('mongoose');
const { Schema } = mongoose;

const closedFriendSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const ClosedFriend = mongoose.model('ClosedFriend', closedFriendSchema);

module.exports = ClosedFriend;