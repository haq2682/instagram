const mongoose = require('mongoose');
const {Schema} = mongoose;

const notificationSchema = new Schema({

});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;