const mongoose = require("mongoose");
const Offer = require('../models/offerModel');
const technologies = require('../tecnologias/programacion');
module.exports = {
    getOffers: async (req, res) => {
        try {
            //Filtrado por no borradas
            const offers = await Offer.find({ isDelete: false }).populate([
                {
                    path: 'owner',
                    select: '_id name surname role.type role.recruiter.logo avatar'
                },
                {
                    path: 'applicants.user',
                    select: 'appliedDate'
                }
            ]);
            res.json(offers);
        } catch (error) {
            res.status(500).json({ msg: "Ningun registro de ofertas" });
        }
    },

    getOffersByOwner: async (req, res) => {
        try {
            const owner = req.params.id
            const offers = await Offer.find({ owner: owner, isDelete: false }).populate([
                {
                    path: 'owner',
                    select: '_id name surname role.type role.recruiter.logo avatar'
                },
                {
                    path: 'applicants',
                    select: 'appliedDate'
                }
            ]);
            res.json(offers);
        } catch (error) {
            res.status(500).json({ msg: "Ningun registro de ofertas" });
        }
    },

    getOfferById: async (req, res) => {
        try {
            //Filtrado por no borradas
            const offer = await Offer.findOne({ _id: req.params.id, isDelete: false }).populate({
                path: 'owner',
                select: '_id name surname avatar role.type role.recruiter.logo role.recruiter.companyName role.recruiter.website role.recruiter.contact'
            });
            if (!offer) {
                return res.status(404).json({ msg: 'Offer not found' });
            }
            return res.json(offer);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    createOffer: async (req, res) => {
        try {
            const userId = req.user.id
            const { position, role, location, contractType, company, salary, skills, description, language } = req.body
            console.log('cuerpo del frontend: ', req.body);
            const salaryNumber = parseInt(salary);

            // 3. Validar longitud mínima
            if (description.length < 10) {
                return res.status(400).json({ msg: 'La descripción debe tener al menos 10 caracteres' });
            }

            // 4. Validar salario (número positivo)
            if (typeof salaryNumber !== 'number' || salaryNumber <= 0) {
                return res.status(400).json({ msg: 'El salario debe ser un número mayor que 0' });
            }

            // 5. Validar skills (debe ser array y con mínimo 1 skill)
            if (!Array.isArray(skills) || skills.length === 0) {
                return res.status(400).json({ msg: 'Debes incluir al menos una habilidad' });
            }

            const offer = await Offer.create({
                position, role, location, contractType, company, salary: salaryNumber, skills, description, language, owner: userId
            })
            res.status(201).json({
                msg: 'Offer created successfully',
                offer
            })
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    updateOffer: async (req, res) => {
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

            if (offer.owner.toString() !== userId) return res.status(403).json({ msg: 'Some required fields are missing' })
            const updatedOffer = await Offer.findByIdAndUpdate(offerId, { ...offerNewData }, { new: true })
            return res.status(200).json({ msg: 'Offer updated', updatedOffer })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    deleteOffer: async (req, res) => {
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
            if (offer.owner.toString() !== userId) return res.status(403).json({ msg: 'Some required fields are missing' })

            const updatedOffer = await Offer.findByIdAndUpdate(offerId, { isDelete: true, deleteAt: new Date() }, { new: true })
            return res.status(200).json({ msg: 'Offer deleted' })

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    getTechnology: async (req, res) => {
        const { q } = req.query;
        if (q) {
            const filtered = technologies.filter((tech) =>
                tech.name.toLowerCase().includes(q.toLowerCase()));
            return res.status(200).json(filtered);
        }
        return res.status(200).json([]);

    },
    getRecruiterStats: async (req, res) => {
        try {
            const recruiterId = req.params.id
            const offers = await Offer.find({ owner: recruiterId, isDelete: false }).select('applicants');
            const totalOffers = offers.length;
            const totalApplicants = offers.reduce((total, offer) => total + (offer.applicants?.length || 0), 0);
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            const applicationsLast7Days = offers.reduce((total, offer) => {
                return (total + (offer.applicants?.filter(app => app.appliedDate > sevenDaysAgo).length || 0));
            }, 0)

            const avgApplicationsPerOffer = totalOffers > 0 ? (totalApplicants / totalOffers).toFixed(2) : 0;
            const avgDailyApplicationsLast7Days = (applicationsLast7Days / 7).toFixed(2);

            res.json({
                totalOffers,
                totalApplicants,
                applicationsLast7Days,
                avgApplicationsPerOffer,
                avgDailyApplicationsLast7Days
            });

        } catch (error) {
            console.error('Error obteniendo estadísticas:', error);
            res.status(500).json({ msg: 'Error obteniendo estadísticas' });
        }
    },
    applyToOffer: async (req, res) => {
        try {
            const offerId = req.params.id
            const userId = req.user.id
            const userRole = req.user.role

            if (userRole !== 'developer') {
                return res.status(403).json({ msg: 'Only developers can apply for offers.' })
            }

            const offer = await Offer.findById(offerId);
            if (!offer) return res.status(404).json({ msg: 'Offer not found' })

            const alreadyApplied = offer.applicants.some(app => app.user.toString() === userId)
            if (alreadyApplied) {
                return res.status(400).json({ msg: 'You have already applied for this offer' })
            }
            offer.applicants.push({ user: userId })
            await offer.save()
            const updatedOffer = await Offer.findById(offerId)
                .populate('owner')
                .populate('applicants.user', 'name email') // Opcional: popular datos del usuario


            return res.status(200).json({
                msg: 'Application completed successfully',
                offer: updatedOffer
            })

        } catch (error) {
            return res.status(500).json({ msg: 'Error applying to the offer', error: error.message })
        }
    },
    getCandidatesByOffer: async (req, res) => {
        try {
            const offerId = req.params.id;
            const offer = await Offer.findById(offerId)
                .populate('applicants.user', 'name email appliedDate') // Popular los datos del usuario
                .populate('owner', 'name surname role.type role.recruiter.logo avatar'); // Popular los datos del propietario de la oferta

            if (!offer) {
                return res.status(404).json({ msg: 'Offer not found' });
            }
            console.log('Offer found:', offer.applicants);
            return res.status(200).json(offer.applicants);
        } catch (error) {
            console.error('Error fetching candidates:', error);
            return res.status(500).json({ msg: 'Error fetching candidates', error: error.message });
        }
    },

    updateCandidateStatus: async (req, res) => {
        try {
            const { id: offerId, candidateId } = req.params;
            const { status } = req.body;
            const userId = req.user.id;
            const roleUser = req.user.role;
            console.log('Updating candidate status:', { offerId, candidateId, status });
            // 1) Validar rol
            if (roleUser !== 'recruiter') {
                return res.status(403).json({ msg: 'No tienes permiso para editar candidatos' });
            }
            // 2) Validar valor de status
            const validStatuses = ['pending', 'reviewed', 'interviewed', 'rejected', 'accepted'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ msg: 'Valor de status no válido' });
            }
            // 3) Buscar la oferta
            const offer = await Offer.findById(offerId);
            if (!offer) {
                return res.status(404).json({ msg: 'Oferta no encontrada' });
            }
            // 4) Comprobar ownership
            if (!offer.owner.equals(userId)) {
                return res.status(403).json({ msg: 'No tienes permiso para actualizar este candidato' });
            }
            // 5) Localizar índice del candidato
            const candidateIndex = offer.applicants.findIndex(app =>
                app._id.equals(candidateId)
            );
            if (candidateIndex === -1) {
                return res.status(404).json({ msg: 'Candidate not found in this offer' });
            }
            // 6) Actualizar estado y guardar
            offer.applicants[candidateIndex].status = status;
            await offer.save();

            // 7) Re-popular datos del candidato actualizado
            await offer.populate('applicants.user', 'name email');

            return res.status(200).json({
                msg: 'Estado del candidato actualizado correctamente',
                offer: offer
            });

        } catch (error) {
            console.error('Error updating candidate status:', error);
            return res.status(500).json({ msg: error.message });
        }
    },
    getOffersAppliedByDev: async (req, res) => {
        try {
            const offers = await Offer.find({
                'applicants.user': req.params.devId,
                isDelete: { $ne: true }
            }).populate([
                { path: 'owner', select: '_id name surname role.type role.recruiter.logo avatar' },
                { path: 'applicants.user', select: 'name email' }
            ]);
            res.status(200).json({ offers });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getOffersByDev: async (req, res) => {
        try {
            const devId = req.user.id
            const roleUser = req.user.role
            if (roleUser !== 'developer') {
                return res.status(403).json({ msg: 'You do not have permission to access this resource' });
            }            
            const offers = await Offer.find({ applicants: { 
        $not: { 
            $elemMatch: { user: devId } 
        } 
    }, isDelete: { $ne: true } }).populate([
                { path: 'owner', select: '_id name surname role.type role.recruiter.logo avatar' },
                { path: 'applicants.user', select: 'name email' }
            ]);
            res.status(200).json({ offers });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
}