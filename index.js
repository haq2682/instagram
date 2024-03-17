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

let googleUserProfile;

const app = express();
dotenv.config();
let port = process.env.EXPRESS_PORT;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
connectToDb();

const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;

app.use(session({
    secret: 'Now I have become death, the destroyer of worlds',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7
    },
    store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/instagram_clone"})
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: google_client_id,
    clientSecret: google_client_secret,
    callbackURL: "http://localhost:8000/auth/google/callback"
},
    function(accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        authController.googleLogin(profile);
        return done(null, profile);
    }
))

app.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));

// app.get('/auth/google', (req, res) => console.log('Working'));
app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/google/error'}),
    function(req, res) {
        res.redirect('/google/success');
    }
);
app.get('/google/success', (req, res) => res.send(googleUserProfile));
app.get('/google/error', (req, res) => res.send("Error Logging In"));
app.use('/auth', authRoutes);

passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
})

app.listen(port, () => console.log('Listening on port: ' + port));