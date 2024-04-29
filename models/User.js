const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const Settings = require('./Settings');
const Photo = require('./Photo');
const crypto = require("crypto");

const saltRounds = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'Username already exists, try a different one'],
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
            message: props => `${props.value} is not a valid website`
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
    verify_token: {
        type: String
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
    settings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Settings'
    },
    profile_picture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
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

userSchema.plugin(passportLocalMongoose, {usernameQueryFields: ["email", "username"]});

userSchema.pre('save', function(next){
    if(!this.isModified('password')) return next();
    bcrypt.hash(this.password, saltRounds, (error, salt) => {
        if(error) return next(error);
        this.password = salt;
        this.verify_token = crypto.randomBytes(16).toString('hex');
        next();
    });
});

userSchema.pre('remove', function(next) {
    Settings.remove({user: this._id}).exec();
    Photo.remove({user: this._id}).exec();
});

const User = mongoose.model('User', userSchema);

module.exports = User;