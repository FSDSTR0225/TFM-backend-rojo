const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

router.get('/', offerController.getOffers);

router.get('/:id', offerController.getOfferById);

module.exports = router;
