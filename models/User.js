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
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        max: 150,
    },
    website: {
        type: String,
    },
    gender: {
        type: String,
        max: 40,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;