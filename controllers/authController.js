const UserModel = require('../models/User');

module.exports = {
    register: async (req, res) => {
        const request = req.body;
        console.log(request.name);
        res.send("Confirmed");
    }
}