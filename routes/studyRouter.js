const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.get('/', isAuthenticated, studyController.getStudies);

router.post('/', isAuthenticated, studyController.createStudy);

router.put('/:id', isAuthenticated, studyController.updateStudy);

module.exports = router;