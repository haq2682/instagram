const multer = require('multer');
const express = require('express');
const router = express.Router();
const {attachUser} = require('../controllers/authController');
const chatController = require('../controllers/chatController');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        return callback(null, './uploads/comment');
    },
    filename: function(req, file, callback) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random()*1E9);
        return callback(null, uniquePrefix + '_' + file.originalname);
    }
})

const upload = multer({storage});

router.get('/join/:id', attachUser, chatController.joinRoom);
router.get('/individual/getAll', attachUser, chatController.getAllIndividualRooms);
router.get('/get/:id', attachUser, chatController.getRoom);

module.exports = router;