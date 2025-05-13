const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', isAuthenticated, projectController.createProject);
router.put('/:id', isAuthenticated, projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
