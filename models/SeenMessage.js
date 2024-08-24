const mongoose = require('mongoose');
const {Schema} = mongoose;

const seenMessageSchema = new Schema({
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

seenMessageSchema.index({ user: 1, message: 1 }, { unique: true });

const SeenMessage = mongoose.model('SeenMessage', seenMessageSchema);

module.exports = SeenMessage;