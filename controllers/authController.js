const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Settings = require("../models/Settings");
const Photo = require("../models/Photo");
const fs = require('fs');
let imageFile = fs.readFileSync('./uploads/pfp/default.jpg');
imageFile = imageFile.toString('base64');

dotenv.config();
let jwt_secret = process.env.JWT_SECRET

module.exports = {
    register: async (req, res) => {
        const newUser = new User(req.body);
        try {
            const newSettings = new Settings({user: newUser._id});
            const defaultPhoto = new Photo({
                filename: 'default.jpg',
                contentType: 'image/jpg',
                data: imageFile,
                user: newUser._id
            });
            newUser.settings = newSettings;
            newUser.profile_picture = defaultPhoto;
            const token = jwt.sign({newUser}, jwt_secret, {expiresIn: '1w'});
            res.cookie('token', token, {httpOnly: true, sameSite: 'none', secure: true});
            await defaultPhoto.save();
            await newSettings.save();
            await newUser.save();
            return res.status(200).json({message: "User registered successfully"});
        }
        catch(error) {
            res.status(400).json(error);
        }
    },
    login: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email}).exec();
        if(!user) return res.status(401).json({message: "User not found"});
        if(!await bcrypt.compare(password, user.password)) return res.status(401).json({message: "Incorrect Password"});
        else {
            const token = jwt.sign({user}, jwt_secret, {expiresIn: '1w'});
            res.cookie('token', token, {httpOnly: true, sameSite: 'none', secure: true});
            return res.status(200).json(user);
        }
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({message: "User logged out successfully"});
    },
    getUser: async (req, res) => {
        // try {
        //     const token = req.cookies.token;
        //     if(!token) return res.status(401).json({message: "User is not logged in"});
        //     const {user} = jwt.verify(token, jwt_secret);
        //     const userFromDB = await User.findOne({email: user.email}).populate('settings').exec();
        //     if(!userFromDB) return res.status(401).json({message: "User not found"});
        //     res.send(userFromDB);
        // }
        // catch(error) {
        //     res.status(500).json({message: error});
        // }
        res.send(req.user);
    },
    attachUser: async (req, res, next) => {
        const token = req.cookies.token;
        if(!token) return res.sendStatus(401);
        const {user} = jwt.verify(token, jwt_secret);
        const userFromDB = await User.findOne({_id: user._id}).populate('settings').populate('profile_picture').exec();
        if(!userFromDB) return res.status(500).json({message: "Invalid Token"});
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