const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectById
} = require('../controllers/projectController');

router.get('/offer', getProjects);

router.get('/offer/:id', getProjectById);

module.exports = router;
