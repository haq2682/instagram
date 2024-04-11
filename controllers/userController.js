const User = require('../models/User');

module.exports = {
    generateNewToken: async (req, res) => {
        try {
            const username = req.body.username;
            const user = await User.findOne({username}).exec();
            if(user) {
                let generateToken = () => {
                    return Math.random().toString(35).substring(2);
                }
    
                let mergeToken = () => {
                    return generateToken() + generateToken();
                }
                user.verify_token = mergeToken();
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
        if(req.body.username) user.username = req.body.username;
        if(req.body.firstName) user.firstName = req.body.firstName;
        if(req.body.lastName) user.lastName = req.body.lastName;
        if(req.body.website) user.website = req.body.website;
        if(req.body.bio) user.bio = req.body.bio;
        if(req.body.gender) user.gender = req.body.gender;
        if(req.body.email) {
            user.email = req.body.email;
            user.email_verified = false;
        }
        user.updated_at = new Date();
        await user.save();
        res.sendStatus(200);
    }
}