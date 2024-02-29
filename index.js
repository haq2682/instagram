const express = require('express');
const bodyParser = require('body-parser');
const connectToDb = require('./db_config/db');
const cors = require('cors')
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

const app = express();
dotenv.config();
let port = process.env.EXPRESS_PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());
connectToDb();

app.use('/auth', authRoutes);

app.listen(port, () => console.log('Listening on port: ' + port));