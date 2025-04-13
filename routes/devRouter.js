const express = require('express');
const router = express.Router();
const devController = require('../controllers/devController');

router.get('/dev', devController.getDevs);

router.get('/dev/:id', devController.getDevById);

module.exports = router
