const Chat = require('../models/Chat');

module.exports = {
    joinRoom: async (req, res) => {
        try {
            if(!req.user.following.includes(req.params.id) && !req.user.followers.includes(req.params.id)) return res.status(403).json({message: 'You must follow or be a follower of this user to initiate a chat'});
            let room = await Chat.findOne({
                chat_type: 'individual',
                members: {$all: [req.user._id, req.params.id], $size: 2}
            });
            if(!room) {
                room = new Chat();
                room.members = [req.user._id, req.params.id];
                await room.save();
            }
            return res.send(room);
        }
        catch(error) {
            console.log(error.message);
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    getAllIndividualRooms: async (req, res) => {
        try {
            const rooms = await Chat.find({members: {$in: req.user._id}}).populate([
                {
                    path: 'members',
                    model: 'User',
                    populate: [
                        {
                            path: 'profile_picture',
                            model: 'ProfilePhoto'
                        }
                    ]
                }
            ]);
            if(rooms.length === 0) return res.status(404).json({message: 'No chats found'});
            return res.send(rooms);
        }
        catch(error) {
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    getRoom: async (req, res) => {
        try {
            const room = await Chat.findOne({_id: req.params.id}).populate([
                {
                    path: 'members',
                    populate: 'profile_picture'
                }
            ]);
            if(!room) {
                const error = new Error('This room does not exist');
                error.status = 404;
                throw error;
            }
            return res.send(room);
        }
        catch(error) {
            console.log(error.message);
            if(error.status === 404) return res.status(404).json({message: error.message});
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    }
}