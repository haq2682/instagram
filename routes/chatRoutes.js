const multer = require('multer');
const express = require('express');
const router = express.Router();
const { attachUser } = require('../controllers/authController');
const chatController = require('../controllers/chatController');
const Chat = require('../models/Chat');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, './uploads/chat');
    },
    filename: function (req, file, callback) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return callback(null, uniquePrefix + '_' + file.originalname);
    }
})

const upload = multer({ storage });

const verifyAdmin = async (req, res, next) => {
    try {
        const chatGroup = await Chat.findOne({ _id: req.params.room_id });
        const user = await User.findOne({ _id: req.body.userId });
        if (!chatGroup || chatGroup.chat_type === "individual") {
            return res.status(404).json({ message: "Chat not found" });
        }
        if (!chatGroup.administrators.includes(req.user._id)) {
            return res.status(403).json({ message: "You do not have permission to assign someone as administrator of the group" });
        }
        if (!user) {
            return res.status(404).json({ message: "This user does not exist" });
        }
        if (!chatGroup.members.includes(user._id)) {
            return res.status(404).json({ message: "This user is not a member of the current group chat" });
        }
        next();
    }
    catch {
        return res.status(500).json({ message: "An unknown error occurred from middleware" });
    }
}

router.get('/join/:id', attachUser, chatController.joinRoom);
router.post('/group/new', attachUser, chatController.newGroup);
router.get('/individual/getAllIndividualRooms', attachUser, chatController.getAllIndividualRooms);
router.get('/group/getAll', attachUser, chatController.getAllGroupRooms);
router.get('/group/user/followers/:page_number/get', attachUser, chatController.getFollowers);
router.put('/group/:room_id/make_admin', [attachUser, verifyAdmin], chatController.makeAdmin);
router.put('/group/:room_id/remove_admin', [attachUser, verifyAdmin], chatController.removeAdmin);
router.get('/room/:id/get', attachUser, chatController.getRoom);
router.post('/new/message', attachUser, upload.single('file'), chatController.newMessage);
router.get('/room/:id/messages/get/:page_number', attachUser, chatController.getRoomMessages);
router.get('/message/:id', attachUser, chatController.getMessage);

module.exports = router;