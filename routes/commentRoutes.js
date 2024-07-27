const express = require('express');
const router = express.Router();
const multer = require('multer');
const {attachUser} = require('../controllers/authController');
const commentController = require('../controllers/commentController');

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

router.post('/add', attachUser, upload.single('file'), commentController.add);
router.get('/post/:id/page/:page_number', commentController.getCommentsOfPost);

module.exports = router;