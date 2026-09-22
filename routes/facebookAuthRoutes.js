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
const public_app_url = process.env.PUBLIC_APP_URL || "http://localhost:3000";

passport.use(new FacebookStrategy({
        clientID: client_id,
        clientSecret: client_secret,
        callbackURL: `${public_app_url}/facebookAuth/facebook/callback`,
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
        res.cookie('token', token, {httpOnly: true, sameSite: 'lax', secure: false});
        res.redirect(public_app_url);
    });

router.get('/facebook/error', (req, res) => res.send("Error Logging In"));

module.exports = router;