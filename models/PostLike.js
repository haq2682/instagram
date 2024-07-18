const mongoose = require('mongoose');
const {Schema} = mongoose;

const postLikeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
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

const PostLike = mongoose.model('PostLike', postLikeSchema);

postLikeSchema.pre(['find', 'findOne', 'findMany'], function(next) {
    this.populate('user post');
    return next();
})

module.exports = PostLike;