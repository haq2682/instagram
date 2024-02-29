const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9._%+-]*$/.test(value);
            },
            message: props => `${props.value} is not a valid username`
        }
    },
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[A-Za-z]+( [A-Za-z]+)*$/.test(value);
            },
            message: props => `${props.value} is not a valid name`
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[A-Za-z]+( [A-Za-z]+)*$/.test(value);
            },
            message: props => `${props.value} is not a valid name`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        min: 8,
        required: true,
    },
    bio: {
        type: String,
        max: 150,
    },
    website: {
        type: String,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    gender: {
        type: String,
        max: 40,
    },
    private: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        default: new Date(),
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;