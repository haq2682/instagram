const mongoose = require('mongoose');
const {Schema} = mongoose;

const mediaSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    media_type: {
        type: String,
        required: true
    },
    format: {
        type: String,
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

const Media = mongoose.model('Media', mediaSchema);

export default Media;