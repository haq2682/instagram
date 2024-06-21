const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const {attachUser} = require("../controllers/authController");
const {upload} = require('../db_config/db');

router.post('/generate_token', userController.generateNewToken);
router.put('/edit', attachUser, upload.single('profile_picture'), userController.edit);
router.get('/removepfp', attachUser, userController.removePfp);

module.exports = router;