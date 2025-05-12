const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.get('/', offerController.getOffers);

router.get('/:id', offerController.getOfferById);

router.post('/', isAuthenticated, offerController.createOffer);

router.put('/:id', isAuthenticated, offerController.updateOffer);

router.patch('/:id/delete', isAuthenticated, offerController.deleteOffer);

module.exports = router;
