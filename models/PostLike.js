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
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const PostLike = mongoose.model('PostLike', postLikeSchema);

postLikeSchema.pre(['find', 'findOne', 'findMany'], function(next) {
    this.populate('user post');
    return next();
})

module.exports = PostLike;