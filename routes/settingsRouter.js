const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.post('/change-password', isAuthenticated, settingsController.changePasssword);
module.exports = router;
