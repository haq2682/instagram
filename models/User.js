const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile_photo: {
        type: File,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    website: {
        type: String,
    },
    gender: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;