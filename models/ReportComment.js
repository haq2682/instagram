const mongoose = require('mongoose');
const {Schema} = mongoose;

const reportCommentSchema = new Schema({
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const ReportComment = mongoose.model('ReportComment', reportCommentSchema);

module.exports = ReportComment;