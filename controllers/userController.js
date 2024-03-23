const User = require('../models/User');

module.exports = {
    generateNewToken: async (req, res) => {
        try {
            const username = req.body.username;
            const user = await User.findOne({username}).exec();
            if(user) {
                let generateToken = () => {
                    return Math.random().toString(35).substring(2);
                }
    
                let mergeToken = () => {
                    return generateToken() + generateToken();
                }
                user.verify_token = mergeToken();
                await user.save();
                res.sendStatus(200).json({message: 'Token renewed successfully'});
            }
            else res.sendStatus(404).json({message: 'User not found'});
        }
        catch(error) {
            res.sendStatus(500).json({message: 'An error occurred while generating a new token'});
        }
    }
}