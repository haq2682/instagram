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
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }, 
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;