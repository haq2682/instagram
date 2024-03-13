const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/user', authController.getUser);
router.post('/verify/:verify_token', authController.verifyEmail);

module.exports = router;