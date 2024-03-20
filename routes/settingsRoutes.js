const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

router.post('/edit', settingsController.edit);

module.exports = router;