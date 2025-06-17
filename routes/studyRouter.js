const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');


router.get('/owner/:ownerId', studyController.getStudiesByOwner);
router.get('/:id', studyController.getStudiesById);

router.post('/', isAuthenticated, studyController.createStudy);

router.put('/:id', isAuthenticated, studyController.updateStudy);

module.exports = router;