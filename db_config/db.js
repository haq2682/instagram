const mongoose = require('mongoose');

async function connectToDb() {
    try {
        const connection = await mongoose.connect('mongodb+srv://haq2682:admin@instaclonecluster.n01vmpe.mongodb.net/instagram_clone?retryWrites=true&w=majority&appName=InstaCloneCluster');
        if(connection) {
            console.log('Successfully connected to the database');
        }
    }
    catch(error) {
        console.log(error);
    }
}
module.exports = {connectToDb};