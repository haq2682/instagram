const mongoose = require('mongoose');
const {Schema} = mongoose;

const reportedPostSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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

const ReportedPost = mongoose.model('ReportedPost', reportedPostSchema);

module.exports = ReportedPost;