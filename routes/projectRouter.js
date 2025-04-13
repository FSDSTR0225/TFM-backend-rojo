const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/project', projectController.getProjects);

router.get('/project/:id', projectController.getProjectById);

module.exports = router;
