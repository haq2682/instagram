const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./db_config/db');
const cors = require('cors')
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const authController = require('./controllers/authController');
const jwt = require("jsonwebtoken");

const app = express();
dotenv.config();
let port = process.env.EXPRESS_PORT;
const jwt_secret = process.env.JWT_SECRET;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
connectToDb();

const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7
    },
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI})
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: google_client_id,
    clientSecret: google_client_secret,
    callbackURL: "http://localhost:8000/auth/google/callback"
},
    authController.googleAuth
))

app.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));


app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/google/error'}),
    function(req, res) {
        const user = req.user;
        const token = jwt.sign({user}, jwt_secret, {expiresIn: '1w'});
        res.cookie('token', token, {httpOnly: true, sameSite: 'none', secure: true});
        res.redirect('http://localhost:3000');
    }
);
app.get('/google/error', (req, res) => res.send("Error Logging In"));
app.use('/auth', authRoutes);

passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
})

app.listen(port, () => console.log('Listening on port: ' + port));