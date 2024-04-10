const Settings = require('../models/Settings');
const User = require("../models/User");

module.exports = {
    editNotifications: async (req, res) => {
        const setting = await Settings.findOne({user: req.body.id});
        const resType = req.body.type;
        setting[resType] = req.body[resType];
        try {
            await setting.save();
            res.sendStatus(200);
        }
        catch(error) {
            console.log(error);
            res.sendStatus(500);
        }
    },
    togglePrivacy: async (req, res) => {
        const email = req.user.email;
        const user = await User.findOne({email: email});
        user.private = req.body.privacy;
        await user.save();
        res.sendStatus(200);
    }
}