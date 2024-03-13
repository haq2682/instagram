const UserModel = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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
    login: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = await UserModel.findOne({email}).exec();
        if(!user) return res.status(401).json({message: "User not found"});
        if(!await bcrypt.compare(password, user.password)) return res.status(401).json({message: "Incorrect Password"});
        else {
            const token = jwt.sign({user}, 'Now I am become death, the destroyer of worlds', {expiresIn: '1w'});
            res.cookie('token', token, {httpOnly: true, sameSite: 'none', secure: true});
            return res.status(200).json(user);
        }
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({message: "User logged out successfully"});
    },
    getUser: async (req, res) => {
        try {
            const token = req.cookies.token;
            if(!token) return res.status(401).json({message: "User is not logged in"});

            const {user} = jwt.verify(token, 'Now I am become death, the destroyer of worlds');
            const userFromDB = await UserModel.find({email: user.email});
            if(!userFromDB) return res.status(401).json({message: "User not found"});
            res.send(userFromDB);
        }
        catch(error) {
            res.status(500).json({message: error});
        }
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