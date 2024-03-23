const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authController = require("../controllers/authController");

router.post('/edit_notifications', settingsController.editNotifications);
router.post('/toggle_privacy', authController.attachUser, settingsController.togglePrivacy);

module.exports = router;