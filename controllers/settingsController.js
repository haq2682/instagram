const Settings = require('../models/Settings');

module.exports = {
    edit: async (req, res) => {
        const setting = await Settings.findOne({user: req.body.id});
        const resType = req.body.type;
        setting[resType] = req.body[resType];
        try {
            await setting.save();
            res.send(200);
        }
        catch(error) {
            console.log(error);
            res.send(500);
        }
    }
}