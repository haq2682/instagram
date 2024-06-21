const User = require('../models/User');
const Photo = require('../models/Photo');
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
        const existing_username = await User.findOne({username: req.body.username}).exec();
        if(existing_username) return res.status(400).json({message: "Entered Username is already taken"});
        const existing_email = await User.findOne({email: req.body.email}).exec();
        if(existing_email) return res.status(400).json({message: "Entered Email is already registered"});
        const user = await User.findOne({_id: req.user._id}).exec();
        user.username = req.body.username || user.username;
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.website = req.body.website || user.website;
        user.bio = req.body.bio || user.bio;
        user.gender = req.body.gender || user.gender;
        if(req.body.email) {
            user.email = req.body.email;
            user.email_verified = false;
        }
        user.updated_at = new Date();
        await user.save();
        res.sendStatus(200);
    },
    removePfp: async (req, res) => {
        const user = await User.findOne({_id: req.user._id}).exec();
        const pfp = await Photo.findOne({_id: user.profile_picture._id}).exec();
        let imageFile = './uploads/pfp/default.jpg';
        pfp.filename = imageFile;
        pfp.updated_at = new Date();
        await pfp.save();
        return res.send(pfp);
    }
}