const express = require('express');
const router = express.Router();
const devController = require('../controllers/devController');

router.get('/', devController.getDevs);
router.get('/:id', devController.getDevById);
router.put('/profile/:id', devController.updateDevProfile);

module.exports = router;