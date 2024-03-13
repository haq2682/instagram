const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./db_config/db');
const cors = require('cors')
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

const app = express();
dotenv.config();
let port = process.env.EXPRESS_PORT;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
connectToDb();

app.use(session({
    secret: 'Now I have become death, the destroyer of worlds',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*7
    },
    store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/instagram_clone"})
}))

app.use('/auth', authRoutes);

app.listen(port, () => console.log('Listening on port: ' + port));