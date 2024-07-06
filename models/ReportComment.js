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
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

const ReportComment = mongoose.model('ReportComment', reportCommentSchema);

module.exports = ReportComment;