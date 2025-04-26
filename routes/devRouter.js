const express = require('express');
const router = express.Router();
const devController = require('../controllers/devController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.get('/', devController.getDevs);
router.get('/:id', devController.getDevById);
router.put('/profile', devController.updateDevProfile);

module.exports = router
