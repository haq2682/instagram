require('dotenv').config();
const { Server } = require('socket.io');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const Media = require('../models/Media');

const io = new Server(9000, {
    cors: {
        methods: ["GET", "POST"],
        credentials: true,
        origin: process.env.FRONT_END_URL
    }
});

async function createNewMessage(data, socket) {
    try {
        const file = data.file;
        console.log(file);
        const chatRoom = await Chat.findOne({_id: data.chatId});
        const newMessage = new Message();
        if(!chatRoom) {
            socket.emit('chat error', 'This chat does not exist');
            return;
        }
        if(file) {
            let newMedia = new Media();
            newMedia.path = `/${file.path}`;
            newMedia.fileName = file.filename;
            newMedia.originalName = file.originalname;
            newMedia.size = file.size;
            if(file.mimetype.startsWith('image/')) {
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
        if(newMessage.description?.length > 300) {
            socket.emit('chat error', 'This message is too long, try sending a shorter message');
            return;
        }
        newMessage.description = data.description || null;
        newMessage.user = data.authId;
        newMessage.chat = chatRoom._id;
        chatRoom.messages.push(newMessage._id);
        if(data.reply_to) newMessage.reply_to = data.reply_to;
        await chatRoom.save();
        await newMessage.save();

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
                        }
                    ]
                },
                {
                    path: 'likes'
                }
            ]);
        return message;
    }
    catch(error) {
        console.log(error.message);
        socket.emit('chat error', 'An unknown error occurred');
    }
} 

module.exports = {
    initChatSocket: () => {
        io.on("connection", (socket) => {
            socket.on('chat message', async (data) => {
                const newMessage = await createNewMessage(data, socket);
                socket.emit('message sent', false);
                if(newMessage) io.emit('new message', newMessage);
            })
        });
    }
}