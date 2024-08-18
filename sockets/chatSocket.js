require('dotenv').config();
const { Server } = require('socket.io');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const Media = require('../models/Media');
const User = require('../models/User');
const SeenMessage = require('../models/SeenMessage');
const DeliveredMessage = require('../models/DeliveredMessage');

const io = new Server(9000, {
    cors: {
        methods: ["GET", "POST"],
        credentials: true,
        origin: process.env.FRONT_END_URL
    }
});

async function deliverMessage(memberId, message, socket) {
    try {
        const newMessageDelivered = new DeliveredMessage();
        newMessageDelivered.user = memberId;
        newMessageDelivered.message = message._id;
        await newMessageDelivered.save();
        
        const delivered = await Message.findOneAndUpdate(
            { _id: message._id },
            { $addToSet: { delivered_to: newMessageDelivered._id } },
            { new: true }
        ).populate([
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
        return delivered;
    }
    catch (error) {
        console.log(error.message);
        socket.emit('chat error', 'An unknown error occurred');
    }
}

async function readMessage(memberId, message, socket) {
    try {
        const newMessageSeen = new SeenMessage();
        newMessageSeen.user = memberId;
        newMessageSeen.message = message._id;
        await newMessageSeen.save();
        
        const seen = await Message.findOneAndUpdate(
            { _id: message._id },
            { $addToSet: { seen_by: newMessageSeen._id } },
            { new: true }
        ).populate([
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
        return seen;
    }
    catch (error) {
        console.log(error.message);
        socket.emit('chat error', 'An unknown error occurred');
    }
}

async function createNewMessage(data, socket) {
    try {
        const file = data.file;
        const chatRoom = await Chat.findOne({ _id: data.chatId });
        if (!chatRoom) {
            socket.emit('chat error', 'This chat does not exist');
            return;
        }
        const newMessage = new Message();
        if (file) {
            let newMedia = new Media();
            newMedia.path = `/${file.path}`;
            newMedia.fileName = file.filename;
            newMedia.originalName = file.originalname;
            newMedia.size = file.size;
            if (file.mimetype.startsWith('image/')) {
                newMedia.media_type = 'image';
            }
            else {
                newMedia.encoding = file.encoding;
                newMedia.media_type = 'video';
            }
            newMedia.format = file.originalname.substr(-3, 3);
            newMedia.message = newMessage._id;
            await newMedia.save();
            newMessage.media = newMedia._id;
        }
        if (newMessage.description?.length > 300) {
            socket.emit('chat error', 'This message is too long, try sending a shorter message');
            return;
        }
        newMessage.description = data.description || null;
        newMessage.user = data.authId;
        newMessage.chat = chatRoom._id;
        chatRoom.messages.push(newMessage._id);
        if (data.reply_to) newMessage.reply_to = data.reply_to;
        await chatRoom.save();
        await newMessage.save();

        await deliverMessage(data.authId, newMessage, socket);
        await readMessage(data.authId, newMessage, socket);

        const chatOfMessage = await Chat.findOne({ _id: chatRoom._id }).populate('members');
        const membersOfChat = chatOfMessage.members;

        await Promise.all(membersOfChat.map(async (member) => {
            if (member._id.toString() !== data.authId && member.isOnline) {
                await deliverMessage(member._id, newMessage, socket);
            }
        }));

        const message = await Message.findOne({ _id: newMessage._id }).populate([
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
        return message;
    }
    catch (error) {
        socket.emit('chat error', 'An unknown error occurred');
    }
}

module.exports = {
    initChatSocket: () => {
        io.on("connection", async (socket) => {
            let typingUsers = new Set();
            let authUser;
            let authId;
            let currentRoom;

            socket.on('init connection', async (data) => {
                authUser = data;
                const response = await User.findOneAndUpdate({ username: authUser?.username }, { $set: { isOnline: true } }).populate([
                    {
                        path: 'profile_picture'
                    },
                    {
                        path: 'chats',
                        populate: [
                            {
                                path: 'messages'
                            },
                        ]
                    }
                ]);

                authId = response._id;
                const undeliveredMessages = await Message.aggregate([
                    { $match: { chat: { $in: response.chats } } },
                    {
                        $lookup: {
                            from: 'deliveredmessages',
                            localField: '_id',
                            foreignField: 'message',
                            as: 'deliveries'
                        }
                    },
                    {
                        $match: {
                            deliveries: {
                                $not: { $elemMatch: { user: authId } }
                            }
                        }
                    }
                ]);

                if(undeliveredMessages.length > 0) {
                    let deliveredMessages = [];
                    for (const message of undeliveredMessages) {
                        const delivered = await deliverMessage(authId, message, socket);
                        deliveredMessages.push(delivered);
                    }
                    io.emit('messages delivered', deliveredMessages);
                }
                
                io.emit('user status change', response);
            })

            socket.on('chat message', async (data) => {
                const newMessage = await createNewMessage(data, socket);
                socket.emit('message sent', false);
                if (newMessage) io.to(currentRoom).emit('new message', newMessage);
            });

            socket.on('join room', (data) => {
                if (currentRoom) {
                    socket.leave(currentRoom);
                }
                currentRoom = data;
                socket.join(currentRoom);
            });

            socket.on('typing', (data) => {
                typingUsers.add(data.username);
                socket.broadcast.to(data.roomId).emit('isTyping', Array.from(typingUsers));
            });

            socket.on('stopTyping', (data) => {
                typingUsers.delete(data.username);
                socket.broadcast.to(data.roomId).emit('isTyping', Array.from(typingUsers));
            });

            socket.on('disconnect', async () => {
                typingUsers.delete(authUser?.username);
                socket.leave(currentRoom);
                socket.broadcast.emit('isTyping', Array.from(typingUsers));
                await User.findOneAndUpdate({ _id: authId }, { $set: { isOnline: false, lastActive: Date.now() } });
                const response = await User.findOne({ _id: authId }).populate('profile_picture');
                io.emit('user status change', response);
            });
        });
    }
}