const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Settings = require("../models/Settings");
const Photo = require("../models/Photo");

dotenv.config();
let jwt_secret = process.env.JWT_SECRET

// Helper function to create JWT token and set cookie
const createTokenAndSetCookie = (user, res) => {
    const token = jwt.sign({user}, jwt_secret, {expiresIn: '1w'});
    res.cookie('token', token, {httpOnly: true, sameSite: 'none', secure: true});
}

module.exports = {
    register: async (req, res) => {
        const newUser = new User(req.body);
        try {
            const newSettings = new Settings({user: newUser._id});
            const defaultPhoto = new Photo({
                filename: '/uploads/pfp/default.jpg',
                user: newUser._id
            });
            newUser.settings = newSettings;
            newUser.profile_picture = defaultPhoto;
            const user = await User.findOne({_id: newUser._id}).exec();
            await Promise.all([defaultPhoto.save(), newSettings.save(), newUser.save()]);
            createTokenAndSetCookie(user, res);
            return res.status(200).json({message: "User registered successfully"});
        }
        catch(error) {
            console.log(error);
        }
    },
    login: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email}).exec();
        if(!user) return res.status(404).json({message: "User not found"});
        if(!await bcrypt.compare(password, user.password)) return res.status(401).json({message: "Incorrect Password"});
        else {
            createTokenAndSetCookie(user, res);
            return res.status(200).json(user);
        }
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({message: "User logged out successfully"});
    },
    getUser: async (req, res) => {
        res.send(req.user);
    },
    attachUser: async (req, res, next) => {
        const token = req.cookies.token;
        if(!token) return res.sendStatus(401);
        const {user} = jwt.verify(token, jwt_secret);
        const userFromDB = await User.findOne({_id: user._id}).populate('settings').populate('profile_picture').exec();
        if(!userFromDB) return res.status(401).json({message: "User not logged in"});
        req.user = userFromDB;
        next();
    },
    verifyEmail: async (req, res) => {
        const token = req.params.verify_token;
        const user = await User.findOne({verify_token: token});
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