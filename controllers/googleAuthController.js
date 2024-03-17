const UserModel = require('../models/User');
const dotenv = require('dotenv');

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
            newUser.save();
            return done(null, newUser);
        }
        else {
            return done(null, user);
        }
    }
}