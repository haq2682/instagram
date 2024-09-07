const mongoose = require('mongoose');
const {Schema} = mongoose;

const helpSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 40
    },
    description: {
        type: String,
        required: true,
    },
    media_path: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Help = mongoose.model('Help', helpSchema);

module.exports = Help;