const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/newProject',projectController.createProject);
router.put('/updateProject',projectController.updateProject);
module.exports = router;
