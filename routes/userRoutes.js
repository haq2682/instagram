const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const {attachUser} = require("../controllers/authController");

router.post('/generate_token', userController.generateNewToken);
router.put('/edit', attachUser, userController.edit);
router.get('/removepfp', attachUser, userController.removePfp);

module.exports = router;