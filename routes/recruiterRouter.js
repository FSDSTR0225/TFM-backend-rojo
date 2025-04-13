const express = require('express');
const router = express.Router();
const {
    getRecruiter,
    getRecruiterById
} = require('../controllers/recruiterController');

router.get('/recruiter', getRecruiters);

router.get('/recruiter/:id', getRecruiterById);

module.exports = router;
