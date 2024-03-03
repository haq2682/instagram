const mongoose = require('mongoose');

function connectToDb() {
    mongoose.connect('mongodb://127.0.0.1:27017/instagram_clone')
        .then(() => console.log('Successfully Connected to the Database'))
        .catch(error => console.log(error));
}

module.exports = connectToDb;