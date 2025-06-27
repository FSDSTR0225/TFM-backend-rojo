const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth/isAutenticated');
const messageController = require('../controllers/messageController');

router.get("/users",isAuthenticated,messageController.getUsers);
router.get("/:id",isAuthenticated,messageController.getMessages)

router.post("/send/:id",isAuthenticated,messageController.sendMessage);

module.exports = router;