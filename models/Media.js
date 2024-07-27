const mongoose = require('mongoose');
const {Schema} = mongoose;

const mediaSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    encoding: {
        type: String,
    },
    size: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    media_type: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentReply'
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

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;