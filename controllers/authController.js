const UserModel = require('../models/User');
const bcrypt = require("bcrypt");

module.exports = {
    register: async (req, res) => {
        const newUser = new UserModel(req.body.values);
        try {
            await newUser.save();
            req.login(newUser, function(err) {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json({
                    status: 'Success',
                    message: 'User saved to database and logged in successfully'
                });
            });
        }
        catch(error) {
            res.status(500).json(error);
        }
    },
    login: (req, res) => {
        res.send(req.user);
    },
    authenticateUser: async (email, password, done) => {
        const user = await UserModel.findOne({email}).exec();
        if(!user) return done(null, false, {message: "User not found"});
        bcrypt.compare(password, user.password, (error, match) => {
            if(error) return done(error);
            done(null, match);
        })
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
    verifyEmail: async (req, res) => {
        const token = req.params.verify_token;
        const user = await UserModel.findOne({verify_token: token});
        if(!user) return res.status(404).json({message: "User not found"});
        if(user.email_verified) return res.status(200).json({message: "User is already verified"});
        user.email_verified = true;
        try {
             await user.save();
             res.status(200).json({message: "User verified successfully"});
        }
        catch(error) {
             console.log(error);
             res.status(500).json(error);
        }
    }
}