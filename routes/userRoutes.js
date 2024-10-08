const express = require('express');
const router = express.Router();
const multer = require('multer');

const userController = require('../controllers/userController');
const {attachUser} = require("../controllers/authController");

const storagePfp = multer.diskStorage({
    destination: function(req, file, callback) {
        return callback(null, './uploads/pfp');
    },
    filename: function(req, file, callback) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random()*1E9);
        return callback(null, uniquePrefix + '_' + file.originalname);
    }
})

const uploadPfp = multer({storage: storagePfp});

router.get('/suggestions', attachUser, userController.suggestions);
router.get('/search', attachUser, userController.search);
router.post('/generate_token', userController.generateNewToken);
router.put('/edit', attachUser,  userController.edit);
router.put('/changepfp', attachUser, uploadPfp.single('profile_picture'), userController.changePfp);
router.get('/removepfp', attachUser, userController.removePfp);
router.get('/profile/:username', attachUser, userController.find);
router.put('/follow/:id', attachUser, userController.follow);
router.put('/unfollow/:id', attachUser, userController.unfollow);
router.put('/accept_request/:id', attachUser, userController.acceptFollowRequest);
router.put('/decline_request/:id', attachUser, userController.declineFollowRequest);
router.put('/cancel_request/:id', attachUser, userController.cancelFollowRequest);
router.put('/remove_follower/:id', attachUser, userController.removeFollower);

module.exports = router;