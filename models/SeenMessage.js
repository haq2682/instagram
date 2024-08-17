const mongoose = require('mongoose');
const {Schema} = mongoose;

const seenMessageSchema = new Schema({
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

const SeenMessage = mongoose.model('SeenMessage', seenMessageSchema);

module.exports = SeenMessage;