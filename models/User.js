const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const Settings = require('./Settings');
const ProfilePhoto = require('./ProfilePhoto');
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
        ref: 'ProfilePhoto',
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    follow_requests_sent_to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    follow_requests_received_from: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    reported_posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReportPost'
    }],
    saved_posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SavedPost'
    }],
    shared_posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SharedPost'
    }],
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        default: new Date(),
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletion_note: {
        type: String
    },
    deleted_at: {
        type: Date,
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
    ProfilePhoto.remove({user: this._id}).exec();
    return next();
});

userSchema.pre('find', function(next) {
    this.where({deleted: false});
    this.populate('profile_picture');
    return next();
})

userSchema.methods.softDelete = async function(note) {
    this.deleted = true;
    this.deleted_at = new Date();
    this.deleteion_note = note;
    await this.save();
}

userSchema.methods.restore = async function(user_id) {
    const user = this.findOne({_id: user_id, deleted: true});
    if(user) {
        user.deleted = false;
        user.deletion_note = null;
        user.deleted_at = null;
        await user.save();
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;