const mongoose = require('mongoose');
const {Schema} = mongoose;

const photoSchema = new Schema({
    filename: String,
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

const ProfilePhoto = mongoose.model('ProfilePhoto', photoSchema);

module.exports = ProfilePhoto;