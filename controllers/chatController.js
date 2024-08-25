const Chat = require('../models/Chat');
const Message = require('../models/Message');
const MessageLike = require('../models/MessageLike');
const User = require('../models/User');

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
                const authUser = await User.findOne({_id: req.user._id});
                const otherUser = await User.findOne({_id: req.params.id});
                authUser.chats.push(room._id);
                await authUser.save();
                otherUser.chats.push(room._id);
                await otherUser.save();
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
            const rooms = await Chat.find({members: {$in: req.user._id}, chat_type: 'individual'}).populate([
                {
                    path: 'members',
                    model: 'User',
                    populate: [
                        {
                            path: 'profile_picture',
                            model: 'ProfilePhoto'
                        }
                    ]
                },
                {
                    path: 'messages',
                    model: 'Message',
                    populate: [
                        {
                            path: 'user',
                            model: 'User'
                        }
                    ],
                }
            ]).sort({'updated_at': -1});
            if(rooms.length === 0) return res.status(404).json({message: 'No chats found'});
            return res.send(rooms);
        }
        catch(error) {
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    getAllGroupRooms: async (req, res) => {
        try {
            const rooms = await Chat.find({members: {$in: req.user._id}, chat_type: 'group'}).populate([
                {
                    path: 'members',
                    populate: [
                        {
                            path: 'profile_picture',
                        }
                    ]
                },
                {
                    path: 'messages',
                    populate: [
                        {
                            path: 'user'
                        }
                    ]
                }
            ]).sort({'updated_at': -1});
            if(rooms.length === 0) return res.status(404).json({message: 'No groups found'});
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
            if(!room || !room.members.some(member => member._id.equals(req.user._id))) {
                const error = new Error('This chat does not exist');
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
    },
    newMessage: async (req, res) => {
        // try {
        //     const file = req.file;
        //     const chatRoom = await Chat.findOne({_id: req.body.chatId});
        //     const newMessage = new Message();
        //     if(!chatRoom) return res.status(404).json({message: 'This chat does not exist'});
        //     if(file) {
        //         let newMedia = new Media();
        //         newMedia.path = `/${file.path}`;
        //         newMedia.fileName = file.filename;
        //         newMedia.originalName = file.originalname;
        //         newMedia.size = file.size;
        //         if(file.mimetype.startsWith('image/')) {
        //             newMedia.media_type = 'image';
        //         }
        //         else {
        //             newMedia.encoding = file.encoding;
        //             newMedia.media_type = 'video';
        //         }
        //         newMedia.format = file.originalname.substr(-3, 3);
        //         newMedia.message = newMessage._id
        //         await newMedia.save();
        //         newMessage.media = newMedia._id;
        //     }
        //     if(newMessage.description?.length > 300) return res.status(403).json({message: 'This message is too long, try sending a shorter message'});

        //     newMessage.description = req.body.description || null;
        //     newMessage.user = req.user._id;
        //     newMessage.chat = chatRoom._id;
        //     chatRoom.messages.push(newMessage._id);
        //     if(req.body.reply_to) newMessage.reply_to = req.body.reply_to;
        //     await chatRoom.save();
        //     await newMessage.save();

        //     const message = await Message.findOne({_id: newMessage._id}).populate([
        //         {
        //             path: 'media',
        //         },
        //         {
        //             path: 'user',
        //             populate: [
        //                 {
        //                     path: 'profile_picture'
        //                 }
        //             ]
        //         },
        //         {
        //             path: 'reply_to',
        //             populate: [
        //                 {
        //                     path: 'media'
        //                 },
        //                 {
        //                     path: 'user',
        //                     populate: [
        //                         {
        //                             path: 'profile_picture'
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     path: 'likes'
        //                 }
        //             ]
        //         },
        //         {
        //             path: 'likes'
        //         }
        //     ]);
        //     res.send(message);
        // }
        // catch(error) {
        //     return res.status(500).json({message: 'An unknown error occurred'});
        // }
        try {
            if(req.file) return res.send(req.file);
        }
        catch(error) {
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    getRoomMessages: async (req, res) => {
        try {
            const chatRoom = await Chat.findOne({_id: req.params.id});
            if(!chatRoom || !chatRoom.members.includes(req.user._id)) return res.status(404).json({message: 'This chat does not exist'});
            let messages = await Message.find({chat: chatRoom._id}).populate([
                {
                    path: 'media',
                },
                {
                    path: 'user',
                    populate: [
                        {
                            path: 'profile_picture'
                        }
                    ]
                },
                {
                    path: 'reply_to',
                    populate: [
                        {
                            path: 'media'
                        },
                        {
                            path: 'user',
                            populate: [
                                {
                                    path: 'profile_picture'
                                }
                            ]
                        },
                        {
                            path: 'likes'
                        },
                        {
                            path: 'seen_by'
                        },
                        {
                            path: 'delivered_to'
                        }
                    ]
                },
                {
                    path: 'likes'
                },
                {
                    path: 'seen_by'
                },
                {
                    path: 'delivered_to'
                }
            ])
            .sort({created_at: 'desc'})
            .limit(15)
            .skip((req.params.page_number - 1) * 15);

            messages = messages.reverse();

            if(messages.length === 0) return res.status(404).json({messages: 'This chat seems empty'});
            return res.send(messages);
        }
        catch(error) {
            console.log(error.message);
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    getMessage: async (req, res) => {
        try {
            const message = await Message.findOne({_id: req.params.id}).populate([
                {
                    path: 'media',
                },
                {
                    path: 'user',
                    populate: [
                        {
                            path: 'profile_picture'
                        }
                    ]
                },
                {
                    path: 'reply_to',
                    populate: [
                        {
                            path: 'media'
                        },
                        {
                            path: 'user',
                            populate: [
                                {
                                    path: 'profile_picture'
                                }
                            ]
                        },
                        {
                            path: 'likes'
                        },
                        {
                            path: 'seen_by',
                            populate: [
                                {
                                    path: 'user',
                                    populate: [
                                        {
                                            path: 'profile_picture'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'delivered_to',
                            populate: [
                                {
                                    path: 'user',
                                    populate: [
                                        {
                                            path: 'profile_picture'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'likes'
                },
                {
                    path: 'seen_by',
                    populate: [
                        {
                            path: 'user',
                            populate: [
                                {
                                    path: 'profile_picture'
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'delivered_to',
                    populate: [
                        {
                            path: 'user',
                            populate: [
                                {
                                    path: 'profile_picture'
                                }
                            ]
                        }
                    ]
                }
            ]);
            if(!message) return res.status(404).json({message: 'This message does not exist'});
            return res.send(message);
        }
        catch(error) {
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    getFollowers: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user._id}).select("followers").populate([
                {
                    path: 'followers',
                    populate: [
                        {
                            path: 'profile_picture',
                        }
                    ],
                    options: {
                        limit: 10,
                        skip: (req.params.page_number - 1) * 10
                    }
                }
            ]);
            const followers = user.followers;
            if(!followers) return res.status(404).json({message: "No followers found"});
            return res.send(followers);
        }
        catch(error) {
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    },
    newGroup: async (req, res) => {
        try {
            const newGroup = new Chat();
            newGroup.members.push(req.user._id);
            for(const user of req.body.users) {
                newGroup.members.push(user);
            }
            newGroup.group_name = req.body.group_name;
            newGroup.chat_type = 'group';
            newGroup.administrators.push(req.user._id);
            newGroup.save();
            return res.send(newGroup);
        }
        catch(error) {
            return res.status(500).json({message: 'An unknown error occurred'});
        }
    }
}