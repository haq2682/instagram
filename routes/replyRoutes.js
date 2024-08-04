const express = require('express');
const router = express.Router();
const multer = require('multer');
const {attachUser} = require('../controllers/authController');
const replyController = require('../controllers/replyController');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        return callback(null, './uploads/comment/reply');
    },
    filename: function(req, file, callback) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random()*1E9);
        return callback(null, uniquePrefix + '_' + file.originalname);
    }
})

const upload = multer({storage});

router.post('/add', attachUser, upload.single('file'), replyController.add);
router.get('/comment/:id/page/:page_number', replyController.getRepliesOfComment);
router.put('/:id/like', attachUser, replyController.likeReply);
router.get('/getLikes/:id', replyController.getLikes);

module.exports = router;