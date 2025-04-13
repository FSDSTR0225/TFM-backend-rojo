const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

router.get('/offer', offerController.getOffers);

router.get('/offer/:id', offerController.getOfferById);

module.exports = router;
