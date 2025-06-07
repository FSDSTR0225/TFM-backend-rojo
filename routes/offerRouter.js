const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const isAuthenticated = require('../middlewares/auth/isAutenticated');

router.get('/', offerController.getOffers);

router.get('/technology', offerController.getTechnology);

router.get('/:id', offerController.getOfferById);

router.get('/profile/:id', offerController.getOffersByOwner);

router.get('/stats/:id',isAuthenticated, offerController.getRecruiterStats);

router.post('/', isAuthenticated, offerController.createOffer);

router.post('/:id/apply', isAuthenticated, offerController.applyToOffer)

router.put('/:id', isAuthenticated, offerController.updateOffer);

router.patch('/:id/delete', isAuthenticated, offerController.deleteOffer);

router.get('/:id/candidates', isAuthenticated, offerController.getCandidatesByOffer);

router.put('/:id/candidates/:candidateId', isAuthenticated, offerController.updateCandidateStatus);

router.get('/applied/:devId', isAuthenticated, offerController.getOffersAppliedByDev);

router.get('/bydev', isAuthenticated, offerController.getOffersByDev);

module.exports = router;
