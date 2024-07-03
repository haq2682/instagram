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
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

const Help = mongoose.model('Help', helpSchema);

export default Help;