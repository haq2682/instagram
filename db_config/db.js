const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectToDb() {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
        if(connection) {
            console.log('Successfully connected to the database');
        }
    }
    catch(error) {
        console.log(error);
    }
}
module.exports = {connectToDb};