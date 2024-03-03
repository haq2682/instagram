const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./db_config/db');
const cors = require('cors')
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const authController = require('./controllers/authController');
const MongoStore = require('connect-mongo');
const axios = require('axios');


const app = express();
dotenv.config();
let port = process.env.EXPRESS_PORT;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
connectToDb();
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

app.use(session({
    secret: "I'm death, the destroyer of worlds",
    resave: false,
    saveUninitialized: true,
    cooke: {
        maxAge: 1000*60*60*24*7
    },
    store: MongoStore.create({mongoUrl: 'mongodb://127.0.0.1:27017/instagram_clone'})
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({usernameField: 'email'}, authController.authenticateUser));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, email: user.email, username: user.username, firstName: user.firstName, lastName: user.lastName });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

app.use('/auth', authRoutes);

app.listen(port, () => console.log('Listening on port: ' + port));