const UserModel = require('../models/User');

module.exports = {
    register: async (req, res) => {
        const newUser = new UserModel(req.body);
        try {
            await newUser.save()
            res.status(200).json({
                status: 'Success',
                data: {
                    newUser
                }
            })
        }
        catch(error) {
            res.status(500).json({
                status: 'Failed',
                message: error.message
            })
        }
    }
}