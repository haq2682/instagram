const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/generate_token', userController.generateNewToken);

module.exports = router;