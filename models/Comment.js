const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    description: {
        type: String
    },
    media_path: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentLike'
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentReply'
    }],
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;