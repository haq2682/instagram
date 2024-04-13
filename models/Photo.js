const mongoose = require('mongoose');
const {Schema} = mongoose;

const photoSchema = new Schema({
    filename: String,
    contentType: String,
    data: String,
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

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;