const UserModel = require('../models/User');
const dotenv = require('dotenv');
const Settings = require("../models/Settings");
const ProfilePhoto = require("../models/ProfilePhoto");
const crypto = require("crypto");

dotenv.config();

module.exports = {
    authenticate: async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        const user = await UserModel.findOne({email}).exec();
        if(!user) {
            const token = crypto.randomBytes(16).toString('hex');

            const newUser = new UserModel({
                username: email.substring(0, email.indexOf("@")),
                email: email,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                password: token,
                email_verified: false,
                verify_token: token,
            })
            const newSettings = new Settings({user: newUser._id});
            const defaultPhoto = new ProfilePhoto({
                filename: '/uploads/pfp/default.jpg',
                user: newUser._id
            });
            await newSettings.save();
            await defaultPhoto.save();
            newUser.settings = newSettings;
            newUser.profile_picture = defaultPhoto;
            await newUser.save();
            return done(null, newUser);
        }
        else {
            return done(null, user);
        }
    }
}