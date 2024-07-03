const User = require('../models/User');
const ProfilePhoto = require('../models/ProfilePhoto');
const crypto = require("crypto");

module.exports = {
    generateNewToken: async (req, res) => {
        try {
            const username = req.body.username;
            const user = await User.findOne({username}).exec();
            if(user) {
                user.verify_token = crypto.randomBytes(16).toString('hex');
                await user.save();
                res.status(200).json({message: 'Token renewed successfully'});
            }
            else res.status(404).json({message: 'User not found'});
        }
        catch(error) {
            res.status(500).json({message: 'An error occurred while generating a new token'});
        }
    },
    edit: async (req, res) => {
        try {
            const { username, email, firstName, lastName, website, bio, gender } = req.body;
            const [existingUsername, existingEmail] = await Promise.all([
                username ? User.findOne({ username }).exec() : null,
                email ? User.findOne({ email }).exec() : null
            ]);
            if (existingUsername) {
                return res.status(400).json({ message: "Entered Username is already taken" });
            }
            if (existingEmail) {
                return res.status(400).json({ message: "Entered Email is already registered" });
            }
            const user = await User.findOne({ _id: req.user._id }).exec();
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            user.username = username || user.username;
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.website = website || user.website;
            user.bio = bio || user.bio;
            user.gender = gender || user.gender;
            if (email) {
                user.email = email;
                user.email_verified = false;
            }
            user.updated_at = new Date();
            await user.save();
            return res.sendStatus(200);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    removePfp: async (req, res) => {
        const user = await User.findOne({_id: req.user._id}).exec();
        const pfp = await ProfilePhoto.findOne({_id: user.profile_picture._id}).exec();
        let imageFile = '/uploads/pfp/default.jpg';
        pfp.filename = imageFile;
        pfp.updated_at = new Date();
        await pfp.save();
        return res.send(pfp);
    },
    changePfp: async (req, res) => {
        const user = await User.findOne({_id: req.user._id}).exec();
        const pfp = await ProfilePhoto.findOne({_id: user.profile_picture._id}).exec();
        let imageFile = '/uploads/pfp/' + req.file.filename;
        pfp.filename = imageFile;
        pfp.updated_at = new Date();
        await pfp.save();
        return res.sendStatus(200);
    }
}