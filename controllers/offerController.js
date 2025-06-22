const mongoose = require("mongoose");
const Offer = require('../models/offerModel');
const User = require('../models/userModel');
const technologies = require('../tecnologias/programacion');
const fs = require('fs');
const pdfkit = require('pdfkit');
const transporter = require("../controllers/emailController");
const { ApplyEmail } = require("../utils/emailTemplate");
const { StatusReviewedEmail, StatusRejectedEmail, CreateOfferEmail } = require("../utils/emailTemplate");

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

            console.log("Oferta creada. esta es su id: ", offer._id);

            const createdOffer = await Offer.findById(offer._id)
                .populate('owner', 'name surname email avatar');

            if (!createdOffer || !createdOffer.owner) {
                console.error('Owner not found creating offer');
                return res.status(500).json({ msg: 'Error finding recruiter data' });
            }

            if (!createdOffer.owner.email) {
                console.error('Recruiter Email not found');
                return res.status(500).json({ msg: 'Error finding email of recruiter' });
            }

            try {
            const info = await transporter.sendMail({
                from: `"Codepply" <codepply.team@gmail.com>`,
                to: createdOffer.owner.email,
                subject: `Offer created Successfully - ${position} at ${company}`,
                text: `${createdOffer.owner.name}, your job offer for ${position} at ${company} has been created successfully`,
                html: CreateOfferEmail( position, company, createdOffer.owner.name, createdOffer.owner.avatar, createdOffer.owner.email
                ),
            });
                    
                console.log("Offer creation email sent:", info);
            } catch (mailError) {
                console.error("Error sending offer creation email:", mailError);
            }

                res.status(201).json({
                    msg: 'Offer created successfully',
                    offer: createdOffer
                });

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
            const { phone, coverLetter, gdprAccepted } = req.body

            if (userRole !== 'developer') {
                return res.status(403).json({ msg: 'Only developers can apply for offers.' })
            }

            const offer = await Offer.findById(offerId);
            if (!offer) return res.status(404).json({ msg: 'Offer not found' })

            const alreadyApplied = offer.applicants.some(app => app.user.toString() === userId)
            if (alreadyApplied) {
                return res.status(400).json({ msg: 'You have already applied for this offer' })
            }
            offer.applicants.push({
                 user: userId,
                 phone,
                 coverLetter,
                 gdprAccepted,})
            await offer.save()
            const updatedOffer = await Offer.findById(offerId)
                .populate('owner')
                .populate('applicants.user', 'name email avatar') // Opcional: popular datos del usuario

            const currentApplicant = updatedOffer.applicants.find(app => 
                app.user._id.toString() === userId
            );

        if (!currentApplicant) {
            console.error('No se encontró currentApplicant');
            return res.status(500).json({ msg: 'Error finding applicant data' });
        }

        // Verificar que el usuario tiene los datos necesarios
        if (!currentApplicant.user.email) {
            console.error('Usuario sin email');
            return res.status(500).json({ msg: 'User email not found' });
        }

            try {
            const info = await transporter.sendMail({
                from: `"Codepply" <codepply.team@gmail.com>`,
                to: currentApplicant.user.email,
                subject: `Hey ${currentApplicant.user.name}, you applied in ${offer.position} of ${offer.company}`,
                text: `Hey ${currentApplicant.user.name}, you applied in ${offer.position} of ${offer.company}.`,
                html: ApplyEmail(offer.position, offer.company, currentApplicant.user.name, currentApplicant.user.avatar, currentApplicant.user.email ),
            });
            console.log("Email enviado:", info);
            } catch (mailError) {
            console.error("Error enviando el correo:", mailError);
            // opcional: podrías continuar sin cortar el registro, o cortar aquí si es crítico
            return res
                .status(500)
                .json({ msg: "Error enviando correo de aplicar en oferta" });
            }

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
                .populate('applicants.user', 'name email surname avatar appliedDate role.developer.skills') // Popular los datos del usuario que ha aplicado a la oferta
                .populate('owner', 'name surname role.type role.recruiter.logo avatar'); // Popular los datos del propietario de la oferta

            if (!offer) {
                return res.status(404).json({ msg: 'Offer not found' });
            }
            console.log('Offer found:', offer.applicants);
            return res.status(200).json({
                nameOffer: offer.position,
                skills: offer.skills,
                applicants:offer.applicants
            });
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
            await offer.populate('applicants.user', 'name surname email avatar developer');

            const updatedCandidate = offer.applicants[candidateIndex];

            if (!updatedCandidate || !updatedCandidate.user) {
                console.error('User not found');
                return res.status(500).json('User not found');
            }

            if (!updatedCandidate.user.email) {
                console.error('Email not found');
                return res.status(500).json('Email not found');
            }


            if (status === 'reviewed') {
                try {

                const info = await transporter.sendMail({
                    from: `"Codepply" <codepply.team@gmail.com>`,
                    to: updatedCandidate.user.email,
                    subject: `Great news — You're one step closer to joining at ${offer.company}`,
                    text: `Great news — you've moved on to the next step in the hiring process!`,
                    html: StatusReviewedEmail(offer.position, offer.company, updatedCandidate.user.name, updatedCandidate.user.avatar, updatedCandidate.user.email ),
                });
                console.log("Email de aceptar/rechazar oferta, enviado:", info);
                } catch (error) {
                    console.error("Error en email de aceptar/rechazar oferta: ", error);
                }
            }

            if (status === 'rejected') {
                try {

                const info = await transporter.sendMail({
                    from: `"Codepply" <codepply.team@gmail.com>`,
                    to: updatedCandidate.user.email,
                    subject: `Your application at ${offer.company} has reviewed`,
                    text: `The company has reviewed your application and made a decision`,
                    html: StatusRejectedEmail(offer.position, offer.company, updatedCandidate.user.name, updatedCandidate.user.avatar, updatedCandidate.user.email ),
                });
                console.log("Email de aceptar/rechazar oferta, enviado:", info);
                } catch (error) {
                    console.error("Error en email de aceptar/rechazar oferta: ", error);
                }
            }

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
                isDelete: false
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
    }, isDelete: false  }).populate([
                { path: 'owner', select: '_id name surname role.type role.recruiter.logo avatar' },
                { path: 'applicants.user', select: 'name email' }
            ]);
            res.status(200).json({ offers });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    generateCoverLetter: async (res, req) => {
        try {
            const {offerId, applicantId} = req.params
             const offer = await Offer.findById(offerId)
             .populate('owner', 'name surname role.recruiter.companyName' )
             .populate('applicants.user', 'name surname email' )

             if(!offer) return res.status(404).json({msg: 'Offer not found'})
                const applicant = offer.applicants.id(applicantId)
                if(!applicant) return res.status(404).json({msg: 'Applicant not found'})

                //crate PDF
           const doc = new PDFDocument();
           const filename = `cover-letter-${applicant.user.name}-${offerId}.pdf`;
           res.setHeader('Content-Type', 'application/pdf');
           res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
           doc.pipe(res);
           // header
           doc.fontSize(18).text('Cover Letter', { align: 'center' }).moveDown();
           doc.fontSize(14).text(`To: ${offer.owner.role.recruiter.companyName}`, { align: 'center' }).moveDown();
           doc.fontSize(12).text(`Subject: ${offer.position}`, { align: 'center' }).moveDown();
           // body
    doc.fontSize(12).text(applicant.coverLetter || 'El candidato no proporcionó carta de presentación');
    doc.moveDown(2);
    
    //footer
    doc.fontSize(10).text(`Fecha de aplicación: ${applicant.appliedDate.toLocaleDateString()}`, { align: 'right' });
    doc.text(`Teléfono de contacto: ${applicant.phone}`, { align: 'right' });
    
    doc.end();
        } catch (error) {
            res.status(500).json({ msg: error.message });
  }
        },

getApplicantPhone: async (req, res) => {
  try {
    const { offerId, applicantId } = req.params;
    const recruiterId = req.user.id;
    
    const offer = await Offer.findOne({
      _id: offerId,
      owner: recruiterId
    });
    
    if (!offer) return res.status(404).json({ msg: 'Offer not found' });
    
    const applicant = offer.applicants.id(applicantId);
    if (!applicant) return res.status(404).json({ msg: 'Applicant not found' });
    
    if (!applicant.gdprAccepted) {
      return res.status(403).json({ 
        msg: 'El candidato no ha dado consentimiento para contacto telefónico' 
      });
    }
    
    res.json({
      phone: applicant.phone,
      name: applicant.user.name // Debería ser poblado en la consulta
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
        
}