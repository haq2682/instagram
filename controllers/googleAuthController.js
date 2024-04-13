const UserModel = require('../models/User');
const dotenv = require('dotenv');
const Settings = require("../models/Settings");
const Photo = require("../models/Photo");
const fs = require('fs');
let imageFile = fs.readFileSync('./uploads/pfp/default.png');
imageFile = imageFile.toString('base64');

dotenv.config();

module.exports = {
    authenticate: async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        const user = await UserModel.findOne({email}).exec();
        if(!user) {
            let generateToken = () => {
                return Math.random().toString(35).substring(2);
            }

            let mergeToken = () => {
                return generateToken() + generateToken();
            }

            const newUser = new UserModel({
                username: email.substring(0, email.indexOf("@")),
                email: email,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                password: mergeToken(),
                email_verified: false,
                verify_token: mergeToken(),
            })
            const newSettings = new Settings({user: newUser._id});
            const defaultPhoto = new Photo({
                filename: 'default.png',
                contentType: 'image/png',
                data: imageFile,
                user: newUser._id
            });
            await newSettings.save();
            await defaultPhoto.save();
            newUser.settings = newSettings;
            newUser.profile_picture = defaultPhoto.toObject();
            await newUser.save();
            return done(null, newUser);
        }
        else {
            return done(null, user);
        }
    }
}