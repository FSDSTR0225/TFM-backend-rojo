const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.get('/',userController.getUsers);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/getUserProfile',isAuthenticated, userController.getUserProfile);
router.post('/forgot-password', userController.forgotPasswordEmail);
router.put('/reset-password/:token', userController.resetPassword);
module.exports = router;
