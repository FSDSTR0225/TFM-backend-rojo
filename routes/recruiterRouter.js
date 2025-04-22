const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.get('/', recruiterController.getRecruiters);

router.get('/:id', recruiterController.getRecruiterById);

router.put("/profile", isAuthenticated, recruiterController.updateRecruiterProfile)

module.exports = router;
