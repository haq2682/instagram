const express = require('express');
const router = express.Router();
const multer = require('multer');
const {attachUser} = require('../controllers/authController');
const postController = require('../controllers/postController');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        return callback(null, './uploads/post');
    },
    filename: function(req, file, callback) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random()*1E9);
        return callback(null, uniquePrefix + '_' + file.originalname);
    }
})

const upload = multer({storage});

router.post('/add', attachUser, upload.array('files'), postController.add);
router.get('/search', postController.search);
router.post('/share', attachUser, postController.sharePost);
router.get('/:id', postController.find);
router.put('/:id/like', attachUser, postController.like);
router.put('/:id/save', attachUser, postController.save);
router.get('/all/:page_number', attachUser, postController.all);
router.get('/getLikes/:id', postController.getLikes);
router.get('/saved/:page_number', attachUser, postController.getAllSaved);

module.exports = router;