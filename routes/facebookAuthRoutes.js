const express = require('express');
const router = express.Router();
const facebookAuthController = require('../controllers/facebookAuthController');
const passport = require("passport");
const FacebookStrategy = require('passport-facebook');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;
const client_id = process.env.FACEBOOK_CLIENT_ID;
const client_secret = process.env.FACEBOOK_CLIENT_SECRET;

passport.use(new FacebookStrategy({
        clientID: client_id,
        clientSecret: client_secret,
        callbackURL: "http://localhost:8000/facebookAuth/facebook/callback",
        enableProof: true,
        profileFields: ['email', 'name']
    },
    facebookAuthController.authenticate
));

router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/facebookAuth/facebook/error' }),
    function(req, res) {
        const user = req.user;
        const token = jwt.sign({user}, jwt_secret, {expiresIn: '1w'});
        res.cookie('token', token, {httpOnly: true, sameSite: 'none', secure: true});
        res.redirect('http://localhost:3000/');
    });

router.get('/facebook/error', (req, res) => res.send("Error Logging In"));

module.exports = router;