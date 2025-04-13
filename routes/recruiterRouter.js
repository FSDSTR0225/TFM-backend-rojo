const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');

router.get('/recruiter', recruiterController.getRecruiters);

router.get('/recruiter/:id', recruiterController.getRecruiterById);

module.exports = router;
