const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.get('/developer/:developerId', projectController.getProjectsByDeveloper);
router.post('/', isAuthenticated, projectController.createProject);
router.put('/:id', isAuthenticated, projectController.updateProject);
router.delete("/:id", isAuthenticated, projectController.deleteProject);
router.post('/:id/view', projectController.incrementView);
router.post('/:id/like', isAuthenticated, projectController.toggleLike);
router.get("/:id/like-status", isAuthenticated, projectController.getLikeStatus);

router.put('/:id/soft-delete', isAuthenticated, projectController.softDeleteProject);


module.exports = router;
