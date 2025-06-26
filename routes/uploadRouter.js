const express = require('express');
const multer = require('multer');
const { uploadImageController } = require('../controllers/uploadController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // memoria para buffers

// Ruta POST para subir imagen
router.post('/upload', upload.any(), uploadImageController);

module.exports = router;