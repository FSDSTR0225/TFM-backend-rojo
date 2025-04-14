const mongoose = require("mongoose");
const Offer = require('../models/offerModel');

module.exports = {
    getOffers : async (req,res) => {
        try {
            const offers = await Offer.find({});
            res.json(offers);
        } catch (error) {
            res.status(500).json({ msg: "Ningun registro de ofertas"});
        }
    },

    getOfferById : async (req,res) => {
        try {
            const offer = await Offer.findById(req.params.id);
            res.json(offer);
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    }
}