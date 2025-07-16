const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contactController');

// POST /api/contact - Enviar formulario de contacto
router.post('/', sendContactEmail);

module.exports = router;
