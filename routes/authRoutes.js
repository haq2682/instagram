const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', passport.authenticate('local'), authController.login);
router.get('/user', authController.getUser);

module.exports = router;