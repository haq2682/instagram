const mongoose = require('mongoose');
const {Schema} = mongoose;

const savedPostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const SavedPost = mongoose.model('SavedPost', savedPostSchema);

module.exports = SavedPost;