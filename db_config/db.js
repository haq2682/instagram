const mongoose = require('mongoose');

async function connectToDb() {
    await mongoose.connect('mongodb://127.0.0.1:27017/instagram_clone');
    console.log("Successfully connected to the database");
}

connectToDb().catch(err => console.log(err));

module.exports = connectToDb;