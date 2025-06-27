const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.get('/owner/:ownerId', experienceController.getExperiencesByOwner);
router.get('/:id', experienceController.getExperienceById);

router.post('/', isAuthenticated, experienceController.createExperience);
router.put('/:id', isAuthenticated, experienceController.updateExperience);
router.put('/:id/soft-delete', isAuthenticated, experienceController.softDeleteExperience);

module.exports = router;