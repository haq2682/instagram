const express = require('express');
const router = express.Router();
const googleAuthController = require('../controllers/googleAuthController');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const dotenv = require("dotenv");

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;
const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
        clientID: google_client_id,
        clientSecret: google_client_secret,
        callbackURL: "http://localhost:8000/googleAuth/google/callback"
    },
    googleAuthController.authenticate
))

router.get('/google', passport.authenticate('google', {scope : ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/google/error'}),
    function(req, res) {
        const user = req.user;
        const token = jwt.sign({user}, jwt_secret, {expiresIn: '1w'});
        res.cookie('token', token, {httpOnly: true, sameSite: 'none', secure: true});
        res.redirect('http://localhost:3000');
    }
);
router.get('/google/error', (req, res) => res.send("Error Logging In"));

module.exports = router;