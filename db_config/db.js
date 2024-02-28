const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/instagram_clone');
    console.log("Successfully connected to the database");
}

main().catch(err => console.log(err));

module.exports = main;