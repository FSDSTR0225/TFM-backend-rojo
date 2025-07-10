const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.get('/', isAuthenticated, settingsController.getSettings);
router.put('/change-password', isAuthenticated, settingsController.updatePassword);
router.delete('/delete-account', isAuthenticated, settingsController.deleteUser);

module.exports = router;
