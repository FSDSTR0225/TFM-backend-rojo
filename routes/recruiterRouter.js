const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');

router.get('/', recruiterController.getRecruiters);

router.get('/:id', recruiterController.getRecruiterById);

module.exports = router;
