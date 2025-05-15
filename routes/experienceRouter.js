const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.get('/', experienceController.getExperiences);

router.post('/', isAuthenticated, experienceController.createExperience);

router.put('/:id', isAuthenticated, experienceController.updateExperience);

module.exports = router;