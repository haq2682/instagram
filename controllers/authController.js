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
    logout: (req, res, next) => {
        req.logout(function (error) {
            if(error) return next(error);
            req.session.destroy(function(err){
                if(err){
                    console.log("error: " + err);
                    res.status(500).json({message: "Error destroying session"});
                } else {
                    console.log("destroying session");
                    res.clearCookie('mcookie');
                    res.status(200).json({message: "Logged out successfully"});
                }
            });
        })
    },
    getUser: (req, res) => {
        res.send(req.user);
    },
    findEmail: async (req, res) => {
        const email = req.body.email;
        const user = await UserModel.findOne({email});
        if(user) res.send(user.email);
    },
    findUsername: async (req, res) => {
        const username = req.body.username;
        const user = await UserModel.findOne({username});
        if(user) res.send(user.username);
    }
}