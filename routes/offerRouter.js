const express = require('express');
const router = express.Router();
const {
    getOffer,
    getOfferById
} = require('../controllers/offerController');

router.get('/offer', getOffers);

router.get('/offer/:id', getOfferById);

module.exports = router;
