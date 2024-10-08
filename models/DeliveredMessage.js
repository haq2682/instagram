const mongoose = require('mongoose');
const {Schema} = mongoose;

const deliveredMessageSchema = new Schema({
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

deliveredMessageSchema.index({ user: 1, message: 1 }, { unique: true });

const DeliveredMessage = mongoose.model('DeliveredMessage', deliveredMessageSchema);

module.exports = DeliveredMessage;