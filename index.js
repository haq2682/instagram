const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./db_config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const authRoutes = require('./routes/authRoutes');
const googleAuthRoutes = require('./routes/googleAuthRoutes');
const facebookAuthRoutes = require('./routes/facebookAuthRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();
let port = process.env.EXPRESS_PORT;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
connectToDb();

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

app.use('/googleAuth', googleAuthRoutes);
app.use('/facebookAuth', facebookAuthRoutes);
app.use('/auth', authRoutes);
app.use('/settings', settingsRoutes);
app.use('/user', userRoutes);

passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
})

app.listen(port, () => console.log('Listening on port: ' + port));