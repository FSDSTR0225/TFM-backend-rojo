const mongoose = require("mongoose");
const Offer = require('../models/offerModel');

module.exports = {
    getOffers : async (req,res) => {
        try {
            //Filtrado por no borradas
            const offers = await Offer.find({isDelete: false});
            res.json(offers);
        } catch (error) {
            res.status(500).json({ msg: "Ningun registro de ofertas"});
        }
    },

    getOfferById : async (req,res) => {
        try {
            //Filtrado por no borradas
            const offer = await Offer.findOne({_id: req.params.id , isDelete:false}).populate({
                path: 'owner',
                select: 'name role.type role.recruiter.logo role.recruiter.companyName role.recruiter.website role.recruiter.contact'
            });
            if (!offer) {
                return res.status(404).json({ msg: 'Offer not found' });
              }
            return res.json(offer);
        } catch (error) {
            return res.status(500).json({ msg: error.message});
        }
    },

    createOffer: async(req, res) => {
        try {
            const userId = req.user.id
            const {position, role, location, contractType, company, salary, skills, description, language} = req.body
        
         // 3. Validar longitud mínima
        if (description.length < 10) {
            return res.status(400).json({ msg: 'La descripción debe tener al menos 10 caracteres' });
        }

        // 4. Validar salario (número positivo)
        if (typeof salary !== 'number' || salary <= 0) {
            return res.status(400).json({ msg: 'El salario debe ser un número mayor que 0' });
        }

        // 5. Validar skills (debe ser array y con mínimo 1 skill)
        if (!Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({ msg: 'Debes incluir al menos una habilidad' });
        }

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
            const roleUser = req.user.role
            const offerNewData = req.body
                    // Validar que el usuario tenga rol recruiter
        if (roleUser !== 'recruiter') {
            return res.status(403).json({ msg: 'No tienes permiso para editar ofertas' });
        }
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
    },

    deleteOffer: async(req, res) => {
        try {
            const offerId = req.params.id
            const userId = req.user.id
            const roleUser = req.user.role
            if (roleUser !== 'recruiter') {
                return res.status(403).json({ msg: 'No tienes permiso para editar ofertas' });
            }
            const offer = await Offer.findById(offerId)

            if (!offer) {
                return res.status(404).json({ msg: 'Offer not found' });
              }
              if(offer.owner.toString() !== userId ) return res.status(403).json({ msg: 'Some required fields are missing' })
                
                const updatedOffer = await Offer.findByIdAndUpdate(offerId, {isDelete: true, deleteAt: new Date()}, {new:true})
                return res.status(200).json({msg:'Offer deleted'})
            
        } catch (error) {
            return  res.status(500).json({ msg: error.message});
        }
    }
}