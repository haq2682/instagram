const UserModel = require('../models/User');
const dotenv = require('dotenv');
const Settings = require("../models/Settings");
const Photo = require("../models/Photo");
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const crypto = require('crypto');

dotenv.config();

module.exports = {
    authenticate: async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        let user = await UserModel.findOne({ email }).exec();

        if (!user) {
            const token = crypto.randomBytes(16).toString('hex');
            user = new UserModel({
                username: email.substring(0, email.indexOf("@")),
                email: email,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                password: token,
                email_verified: false,
                verify_token: token,
            });

            const settings = new Settings({ user: user._id });
            await settings.save();
            user.settings = settings;

            let imageName = 'default.jpg';
            let imageBuffer = fs.readFileSync(`./uploads/pfp/${imageName}`);
            let contentType = 'image/jpg';

            if (profile.photos[0]?.value) {
                try {
                    imageName = `${crypto.randomBytes(32).toString('hex')}.jpg`;
                    const response = await axios.get(profile.photos[0].value, { responseType: 'stream' });
                    const imagePath = path.join(__dirname, '../uploads/pfp', imageName);
                    const writer = fs.createWriteStream(imagePath);
                    response.data.pipe(writer);
                    await new Promise((resolve, reject) => {
                        writer.on('finish', resolve);
                        writer.on('error', reject);
                    });
                    imageBuffer = fs.readFileSync(imagePath);
                } catch (e) {
                    console.error(e);
                }
            }

            const photo = new Photo({
                filename: imageName,
                contentType: contentType,
                data: imageBuffer.toString('base64'),
                user: user._id
            });
            await photo.save();
            user.profile_picture = photo.toObject();

            await user.save();
            return done(null, user);
        } else {
            return done(null, user);
        }
    }
};