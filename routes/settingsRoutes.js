const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authController = require("../controllers/authController");

router.put('/edit_notifications', settingsController.editNotifications);
router.put('/toggle_privacy', authController.attachUser, settingsController.togglePrivacy);

module.exports = router;