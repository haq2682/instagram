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
    },
    login: (req, res) => {
        res.send(req.user);
    },
    authenticateUser: async (email, password, done) => {
        const user = await UserModel.findOne({email}).exec();
        if(!user) return done(null, false, {message: "User not found"});
        if(user && password !== user.password) return done(null, false, {message: "Incorrect Password"});
        return done(null, user);
    },
    getUser: (req, res) => {
        if(!req.user) res.send(null);
        res.send(req.user);
    }
}