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
    },

    createOffer: async(req, res) => {
        try {
            const userId = req.user.id
            const {position, role, location, contractType, company, salary, skills, description, language} = req.body

            const offer = await Offer.create({
                position, role, location, contractType, company, salary, skills, description, language, owner: userId
            })

            res.status(201).json({
                msg: 'Offer created successfully',
                offer
            })
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    },

    updateOffer: async(req, res) => {
        try {
            const offerId = req.params.id
            const userId = req.user.id
            const offerNewData = req.body
            const offer = await Offer.findById(offerId)
            if (!offer) {
                return res.status(404).json({ msg: 'Offer not found' });
              }
            if(offer.owner.toString() !== userId ) return res.status(403).json({ msg: 'Some required fields are missing' })
            const updatedOffer = await Offer.findByIdAndUpdate(offerId, {...offerNewData}, {new:true})
            return res.status(200).json({msg:'Offer updated', updatedOffer})
        } catch (error) {
            return  res.status(500).json({ msg: error.message});
        }
    }
}