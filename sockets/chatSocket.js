require('dotenv').config();
const { Server } = require('socket.io');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const Media = require('../models/Media');
const User = require('../models/User');
const SeenMessage = require('../models/SeenMessage');
const DeliveredMessage = require('../models/DeliveredMessage');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const io = new Server(9000, {
    cors: {
        methods: ["GET", "POST"],
        credentials: true,
        origin: process.env.FRONT_END_URL
    }
});

function compressVideo(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .videoBitrate(1000)
            .outputOptions([
                '-maxrate 1M',
                '-bufsize 2M'
            ])
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            })
            .save(outputPath);
    });
}

async function deliverMessage(memberId, message, socket) {
    if (!memberId) return;
    try {
        const deliveredMessage = await DeliveredMessage.findOne({ user: memberId, message: message._id });
        if(!deliveredMessage) {
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
    }
    catch (error) {
        socket.emit('chat error', 'An unknown error occurred');
    }
}

async function readMessage(memberId, message, socket) {
    if (!memberId) return;
    try {
        const seenMessage = await SeenMessage.findOne({ user: memberId, message: message._id });
        if (!seenMessage) {
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
    }
    catch (error) {
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

                const inputPath = file.path;
                const outputPath = path.join(path.dirname(inputPath), `compressed_${file.filename}`);
                await compressVideo(inputPath, outputPath);

                const stats = fs.statSync(outputPath);
                newMedia.path = `/${outputPath}`;
                newMedia.fileName = `compressed_${file.filename}`;
                newMedia.size = stats.size;

                fs.unlinkSync(inputPath);
            }
            newMedia.format = path.extname(newMedia.fileName);
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

async function getUnseenMessagesCount(loggedInUserId) {
    const seenMessageIds = await SeenMessage.find({ user: loggedInUserId }).distinct('message');
    const unseenMessages = await Message.countDocuments({
        chat: {
            $in: await Chat.find({ members: { $in: loggedInUserId } }).distinct('_id')
        },
        deleted: false,
        _id: { $nin: seenMessageIds }  // Exclude messages that the user has seen
    });
    return unseenMessages;
}

async function getChatUnseenMessagesCount(loggedInUserId, roomId) {
    const seenMessageIds = await SeenMessage.find({ user: loggedInUserId }).distinct('message');
    const unseenMessages = await Message.countDocuments({
        chat: {
            $in: await Chat.find({ _id: roomId}).distinct('_id')
        },
        deleted: false,
        _id: { $nin: seenMessageIds }  // Exclude messages that the user has seen
    });
    const response = {
        count: unseenMessages,
        roomId: roomId
    }
    return response;
}

module.exports = {
    initChatSocket: () => {
        io.on("connection", async (socket) => {
            let typingUsers = new Set();
            let currentRoom;

            socket.on('init connection', async (data) => {
                socket.authUser = data;
                const response = await User.findOneAndUpdate({ username: socket.authUser.username }, { $set: { isOnline: true } }).populate([
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
                                $not: { $elemMatch: { user: socket.authUser._id } }
                            }
                        }
                    }
                ]);

                if (undeliveredMessages.length > 0) {
                    let deliveredMessages = [];
                    for (const message of undeliveredMessages) {
                        const delivered = await deliverMessage(socket.authUser._id, message, socket);
                        deliveredMessages.push(delivered);
                    }
                    io.emit('messages delivered', deliveredMessages);
                }

                io.emit('user status change', response);
            });

            socket.on('get unseen messages count', async () => {
                if (!socket.authUser) return;
                let unseenMessagesCount = await getUnseenMessagesCount(socket.authUser._id);
                socket.emit('response unseen messages count', unseenMessagesCount);
            });

            socket.on('get chat unseen messages count', async (roomId) => {
                if(!socket.authUser) return;
                let unseenMessagesCount = await getChatUnseenMessagesCount(socket.authUser._id, roomId);
                socket.emit('response chat unseen messages count', unseenMessagesCount);
            })
            socket.on('chat message', async (data) => {
                if (!socket.authUser) return;
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

            socket.on('read message', async (data) => {
                if (!socket.authUser) return;
                const message = await Message.findOne({ _id: data._id });
                const seenMessage = await readMessage(socket.authUser._id, message, socket);
                io.emit('message seen', seenMessage);
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
                typingUsers.delete(socket.authUser?.username);
                socket.leave(currentRoom);
                socket.broadcast.emit('isTyping', Array.from(typingUsers));
                if (socket.authUser) {
                    await User.findOneAndUpdate({ _id: socket.authUser._id }, { $set: { isOnline: false, lastActive: Date.now() } });
                    const response = await User.findOne({ _id: socket.authUser._id }).populate('profile_picture');
                    io.emit('user status change', response);
                }
            });
        });
    }
}
