const mongoose = require('mongoose');
const {Schema} = mongoose;

const sharedPostSchema = new Schema({
    description: {
        type: String
    },
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
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

const SharedPost = mongoose.model('SharedPost', sharedPostSchema);

export default SharedPost;