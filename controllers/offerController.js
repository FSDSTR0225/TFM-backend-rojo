const mongoose = require("mongoose");
const Offer = require("../models/offerModel");
const User = require("../models/userModel");
const technologies = require("../tecnologias/programacion");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const transporter = require("../controllers/emailController");
const {
  ApplyEmail,
  StatusReviewedEmail,
  StatusRejectedEmail,
  CreateOfferEmail,
} = require("../utils/emailTemplate");

module.exports = {
  getOffers: async (req, res) => {
    try {
      //Filtrado por no borradas
      let offers = await Offer.find({ isDelete: false }).populate([
        {
          path: "owner",
          select: "_id name surname role.type role.recruiter.logo avatar",
          match: { isDeleted: { $ne: true } }
        },
        {
          path: "applicants.user",
          select: "appliedDate",
          match: { isDeleted: { $ne: true } }
        },
      ]);
      offers = offers.filter((offer) => offer.owner !== null);
      res.json(offers);
    } catch (error) {
      return res.status(500).json({ msg: "Ningun registro de ofertas" });
    }
  },

  getOffersByOwner: async (req, res) => {
    try {
      const owner = req.params.id;
      const offers = await Offer.find({
        owner: owner,
        isDelete: false,
      }).populate([
        {
          path: "owner",
          select: "_id name surname role.type role.recruiter.logo avatar",
          match: { isDeleted: { $ne: true } }
        },
        {
          path: "applicants",
          select: "appliedDate",
          match: { isDeleted: { $ne: true } }
        },
      ]);

      res.json(offers);
    } catch (error) {
      return res.status(500).json({ msg: "Ningun registro de ofertas" });
    }
  },

  getOfferById: async (req, res) => {
    try {
      //Filtrado por no borradas
      const offer = await Offer.findOne({
        _id: req.params.id,
        isDelete: false,
      }).populate({
        path: "owner",
        select:
          "_id name surname avatar role.type role.recruiter.logo role.recruiter.companyName role.recruiter.website role.recruiter.contact",
        match: { isDeleted: { $ne: true } }
      });
      if (!offer || !offer.owner) {
        return res.status(404).json({ msg: "Offer not found" });
      }
      return res.json(offer);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  createOffer: async (req, res) => {
    try {
      const userId = req.user.id;
      const {
        position,
        role,
        location,
        contractType,
        company,
        salary,
        skills,
        description,
        language,
      } = req.body;
      console.log("cuerpo del frontend: ", req.body);
      const salaryNumber = parseInt(salary);

      // 3. Validar longitud mínima
      if (description.length < 10) {
        return res
          .status(400)
          .json({ msg: "La descripción debe tener al menos 10 caracteres" });
      }

      // 4. Validar salario (número positivo)
      if (typeof salaryNumber !== "number" || salaryNumber <= 0) {
        return res
          .status(400)
          .json({ msg: "El salario debe ser un número mayor que 0" });
      }

      // 5. Validar skills (debe ser array y con mínimo 1 skill)
      if (!Array.isArray(skills) || skills.length === 0) {
        return res
          .status(400)
          .json({ msg: "Debes incluir al menos una habilidad" });
      }

      const offer = await Offer.create({
        position,
        role,
        location,
        contractType,
        company,
        salary: salaryNumber,
        skills,
        description,
        language,
        owner: userId,
      });

      console.log("Oferta creada. esta es su id: ", offer._id);

      const createdOffer = await Offer.findById(offer._id).populate(
        "owner",
        "name surname email avatar"
      );

      if (!createdOffer || !createdOffer.owner) {
        console.error("Owner not found creating offer");
        return res.status(500).json({ msg: "Error finding recruiter data" });
      }

      if (!createdOffer.owner.email) {
        console.error("Recruiter Email not found");
        return res
          .status(500)
          .json({ msg: "Error finding email of recruiter" });
      }
      try {
        const info = await transporter.sendMail({
          from: `"Codepply" <codepply.team@gmail.com>`,
          to: createdOffer.owner.email,
          subject: `Offer created Successfully - ${position} at ${company}`,
          text: `${createdOffer.owner.name}, your job offer for ${position} at ${company} has been created successfully`,
          html: CreateOfferEmail(
            position,
            company,
            createdOffer.owner.name,
            createdOffer.owner.avatar,
            createdOffer.owner.email
          ),
        });

        console.log("Offer creation email sent:", info);
      } catch (mailError) {
        console.error("Error sending offer creation email:", mailError);
        // No hacer return ni cortar aquí
      }

      res.status(201).json({
        msg: "Offer created successfully",
        offer: createdOffer,
        // podrías añadir info si quieres, ej:
        // mailSent: !mailError
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  updateOffer: async (req, res) => {
    try {
      const offerId = req.params.id;
      const userId = req.user.id;
      const roleUser = req.user.role;
      const offerNewData = req.body;
      // Validar que el usuario tenga rol recruiter
      if (roleUser !== "recruiter") {
        return res
          .status(403)
          .json({ msg: "No tienes permiso para editar ofertas" });
      }
      const offer = await Offer.findById(offerId);

      if (!offer) {
        return res.status(404).json({ msg: "Offer not found" });
      }

      if (offer.owner.toString() !== userId)
        return res
          .status(403)
          .json({ msg: "Some required fields are missing" });
      const updatedOffer = await Offer.findByIdAndUpdate(
        offerId,
        { ...offerNewData },
        { new: true }
      );
      return res.status(200).json({ msg: "Offer updated", updatedOffer });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteOffer: async (req, res) => {
    try {
      const offerId = req.params.id;
      const userId = req.user.id;
      const roleUser = req.user.role;
      if (roleUser !== "recruiter") {
        return res
          .status(403)
          .json({ msg: "No tienes permiso para editar ofertas" });
      }
      const offer = await Offer.findById(offerId);

      if (!offer) {
        return res.status(404).json({ msg: "Offer not found" });
      }
      if (offer.owner.toString() !== userId)
        return res
          .status(403)
          .json({ msg: "Some required fields are missing" });

      const updatedOffer = await Offer.findByIdAndUpdate(
        offerId,
        { isDelete: true, deleteAt: new Date() },
        { new: true }
      );
      return res.status(200).json({ msg: "Offer deleted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getTechnology: async (req, res) => {
    const { q } = req.query;
    if (q) {
      const filtered = technologies.filter((tech) =>
        tech.name.toLowerCase().includes(q.toLowerCase())
      );
      return res.status(200).json(filtered);
    }
    return res.status(200).json([]);
  },

  getAllTechnologies: async (req, res) => {
    try {
      // technologies es el array importado de programacion.js
      return res.status(200).json(technologies);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching technologies" });
    }
  },

  getRecruiterStats: async (req, res) => {
    try {
      const recruiterId = req.params.id;
      const offers = await Offer.find({
        owner: recruiterId,
        isDelete: false,
      }).select("applicants");
      const totalOffers = offers.length;
      const totalApplicants = offers.reduce(
        (total, offer) => total + (offer.applicants?.length || 0),
        0
      );
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const applicationsLast7Days = offers.reduce((total, offer) => {
        return (
          total +
          (offer.applicants?.filter((app) => app.appliedDate > sevenDaysAgo)
            .length || 0)
        );
      }, 0);

      const avgApplicationsPerOffer =
        totalOffers > 0 ? (totalApplicants / totalOffers).toFixed(2) : 0;
      const avgDailyApplicationsLast7Days = (applicationsLast7Days / 7).toFixed(
        2
      );

      res.json({
        totalOffers,
        totalApplicants,
        applicationsLast7Days,
        avgApplicationsPerOffer,
        avgDailyApplicationsLast7Days,
      });
    } catch (error) {
      console.error("Error obteniendo estadísticas:", error);
      res.status(500).json({ msg: "Error obteniendo estadísticas" });
    }
  },
  applyToOffer: async (req, res) => {
    try {
      console.log("=== INICIO applyToOffer ===");
      console.log("Request params:", req.params);
      console.log("Request body:", req.body);
      console.log("User info:", req.user);
      
      const offerId = req.params.id;
      const userId = req.user.id;
      const userRole = req.user.role;
      const { phone, coverLetter, gdprAccepted } = req.body;

      console.log("Extracted data:", { offerId, userId, userRole, phone, gdprAccepted });

      if (userRole !== "developer") {
        console.log("ERROR: User is not a developer");
        return res
          .status(403)
          .json({ msg: "Only developers can apply for offers." });
      }
      
      console.log("Searching for offer with ID:", offerId);
      const offer = await Offer.findById(offerId);
      if (!offer) {
        console.log("ERROR: Offer not found");
        return res.status(404).json({ msg: "Offer not found" });
      }
      
      console.log("Offer found:", offer.position, "at", offer.company);

      const alreadyApplied = offer.applicants.some(
        (app) => app.user.toString() === userId
      );
      if (alreadyApplied) {
        console.log("ERROR: User already applied");
        return res
          .status(400)
          .json({ msg: "You have already applied for this offer" });
      }
      
      console.log("Adding applicant to offer...");
      offer.applicants.push({
        user: userId,
        phone,
        coverLetter,
        gdprAccepted,
      });
      
      console.log("Saving offer...");
      await offer.save();
      console.log("Offer saved successfully");

      console.log("Fetching updated offer with populated data...");
      const updatedOffer = await Offer.findById(offerId)
        .populate("owner")
        .populate("applicants.user", "name email avatar");
      
      console.log("Updated offer retrieved");
      console.log("Number of applicants:", updatedOffer.applicants.length);
      
      // Filtrar aplicantes con usuarios válidos
      const validApplicants = updatedOffer.applicants.filter(
        (app) => app.user && app.user._id
      );
      
      console.log("Valid applicants:", validApplicants.length);
      console.log("Looking for userId:", userId);

      const currentApplicant = validApplicants.find(
        (app) => app.user._id.toString() === userId
      );

      if (!currentApplicant) {
        console.error("ERROR: No se encontró currentApplicant");
        return res.status(500).json({ msg: "Error finding applicant data" });
      }
      
      console.log("Current applicant found:", currentApplicant.user.name);

      // Verificar que el usuario tiene los datos necesarios
      if (!currentApplicant.user.email) {
        console.error("ERROR: Usuario sin email");
        return res.status(500).json({ msg: "User email not found" });
      }

      console.log("Attempting to send email...");
      try {
        const info = await transporter.sendMail({
          from: `"Codepply" <codepply.team@gmail.com>`,
          to: currentApplicant.user.email,
          subject: `Hey ${currentApplicant.user.name}, you applied in ${offer.position} of ${offer.company}`,
          text: `Hey ${currentApplicant.user.name}, you applied in ${offer.position} of ${offer.company}.`,
          html: ApplyEmail(
            offer.position,
            offer.company,
            currentApplicant.user.name,
            currentApplicant.user.avatar,
            currentApplicant.user.email
          ),
        });
        console.log("Email sent successfully:", info.messageId);
      } catch (mailError) {
        console.error("Error sending email (continuing anyway):", mailError.message);
      }

      console.log("Returning successful response...");
      return res.status(200).json({
        msg: "Application completed successfully",
        offer: updatedOffer,
      });
    } catch (error) {
      console.error("=== ERROR in applyToOffer ===");
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      return res
        .status(500)
        .json({ msg: "Error applying to the offer", error: error.message });
    }
  },
  getCandidatesByOffer: async (req, res) => {
    try {
      const offerId = req.params.id;
      const offer = await Offer.findById(offerId)
        .populate({
          path: "applicants.user",
          select: "name email surname avatar appliedDate role.developer.skills role.developer.location role.developer.professionalPosition role.developer.resume",
          match: { isDeleted: { $ne: true } }
        })
        .populate({
          path: "owner",
          select: "name surname role.type role.recruiter.logo avatar",
          match: { isDeleted: { $ne: true } }
        });

      if (!offer) {
        return res.status(404).json({ msg: "Offer not found" });
      }
      console.log("Offer found:", offer.applicants);

      const filteredApplicants = offer.applicants.filter(
        (applicant) => applicant.user !== null
      );

      return res.status(200).json({
        nameOffer: offer.position,
        skills: offer.skills,
        applicants: filteredApplicants,
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      return res
        .status(500)
        .json({ msg: "Error fetching candidates", error: error.message });
    }
  },

  updateCandidateStatus: async (req, res) => {
    try {
      const { id: offerId, candidateId } = req.params;
      const { status } = req.body;
      const userId = req.user.id;
      const roleUser = req.user.role;
      console.log("Updating candidate status:", {
        offerId,
        candidateId,
        status,
      });
      // 1) Validar rol
      if (roleUser !== "recruiter") {
        return res
          .status(403)
          .json({ msg: "No tienes permiso para editar candidatos" });
      }
      // 2) Validar valor de status
      const validStatuses = [
        "pending",
        "reviewed",
        "interviewed",
        "rejected",
        "accepted",
      ];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ msg: "Valor de status no válido" });
      }
      // 3) Buscar la oferta
      const offer = await Offer.findById(offerId);
      if (!offer) {
        return res.status(404).json({ msg: "Oferta no encontrada" });
      }
      // 4) Comprobar ownership
      if (!offer.owner.equals(userId)) {
        return res
          .status(403)
          .json({ msg: "No tienes permiso para actualizar este candidato" });
      }
      // 5) Localizar índice del candidato
      const candidateIndex = offer.applicants.findIndex((app) =>
        app._id.equals(candidateId)
      );
      if (candidateIndex === -1) {
        return res
          .status(404)
          .json({ msg: "Candidate not found in this offer" });
      }
      // 6) Actualizar estado y guardar
      offer.applicants[candidateIndex].status = status;
      await offer.save();

      // 7) Re-popular datos del candidato actualizado
      await offer.populate({
        path: "applicants.user",
        select: "name surname email avatar developer role.developer.location role.developer.skills role.developer.professionalPosition role.developer.resume",
        match: { isDeleted: { $ne: true } }
      });

      const updatedCandidate = offer.applicants[candidateIndex];

      if (!updatedCandidate || !updatedCandidate.user) {
        console.error("User not found or is deleted");
        return res.status(500).json("User not found or is deleted");
      }

      if (!updatedCandidate.user.email) {
        console.error("Email not found");
        return res.status(500).json("Email not found");
      }

      if (status === "reviewed") {
        try {
          const info = await transporter.sendMail({
            from: `"Codepply" <codepply.team@gmail.com>`,
            to: updatedCandidate.user.email,
            subject: `Great news — You're one step closer to joining at ${offer.company}`,
            text: `Great news — you've moved on to the next step in the hiring process!`,
            html: StatusReviewedEmail(
              offer.position,
              offer.company,
              updatedCandidate.user.name,
              updatedCandidate.user.avatar,
              updatedCandidate.user.email
            ),
          });
          console.log("Email de aceptar/rechazar oferta, enviado:", info);
        } catch (error) {
          console.error("Error en email de aceptar/rechazar oferta: ", error);
        }
      }

      if (status === "rejected") {
        try {
          const info = await transporter.sendMail({
            from: `"Codepply" <codepply.team@gmail.com>`,
            to: updatedCandidate.user.email,
            subject: `Your application at ${offer.company} has rejected`,
            text: `The company has reviewed your application and made a decision`,
            html: StatusRejectedEmail(
              offer.position,
              offer.company,
              updatedCandidate.user.name,
              updatedCandidate.user.avatar,
              updatedCandidate.user.email
            ),
          });
          console.log("Email de aceptar/rechazar oferta, enviado:", info);
        } catch (error) {
          console.error("Error en email de aceptar/rechazar oferta: ", error);
        }
      }

      return res.status(200).json({
        msg: "Estado del candidato actualizado correctamente",
        offer: offer,
      });
    } catch (error) {
      console.error("Error updating candidate status:", error);
      return res.status(500).json({ msg: error.message });
    }
  },
  getOffersAppliedByDev: async (req, res) => {
    try {
      const offers = await Offer.find({
        "applicants.user": req.params.devId,
        isDelete: false,
      }).populate([
        {
          path: "owner",
          select: "_id name surname role.type role.recruiter.logo avatar",
          match: { isDeleted: { $ne: true } }
        },
        { 
          path: "applicants.user", 
          select: "name email",
          match: { isDeleted: { $ne: true } }
        },
      ]);
      
      // Filtrar ofertas que tengan owner válido
      const validOffers = offers.filter(offer => offer.owner !== null);
      
      res.status(200).json({ offers: validOffers });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getOffersByDev: async (req, res) => {
    try {
      const devId = req.user.id;
      const roleUser = req.user.role;
      if (roleUser !== "developer") {
        return res
          .status(403)
          .json({ msg: "You do not have permission to access this resource" });
      }
      const offers = await Offer.find({
        applicants: {
          $not: {
            $elemMatch: { user: devId },
          },
        },
        isDelete: false,
      }).populate([
        {
          path: "owner",
          select: "_id name surname role.type role.recruiter.logo avatar",
          match: { isDeleted: { $ne: true } }
        },
        { 
          path: "applicants.user", 
          select: "name email",
          match: { isDeleted: { $ne: true } }
        },
      ]);
      
      // Filtrar ofertas que tengan owner válido
      const validOffers = offers.filter(offer => offer.owner !== null);
      
      res.status(200).json({ offers: validOffers });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  generateCoverLetter: async (req, res) => {
    try {
      const { offerId, applicantId } = req.params;
      const offer = await Offer.findById(offerId)
        .populate("owner", "name surname role.recruiter.companyName")
        .populate("applicants.user", "name surname email");

      if (!offer) return res.status(404).json({ msg: "Offer not found" });
      const applicant = offer.applicants.id(applicantId);
      if (!applicant)
        return res.status(404).json({ msg: "Applicant not found" });

      //crate PDF
      const doc = new PDFDocument();
      const safeName = applicant.user.name
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/ /g, "_");
      const filename = `cover-letter-${safeName}-${offerId}.pdf`;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      doc.pipe(res);
      // header
      doc.fontSize(18).text("Cover Letter", { align: "center" }).moveDown();
      doc
        .fontSize(14)
        .text(`To: ${offer.owner.role.recruiter.companyName}`, {
          align: "center",
        })
        .moveDown();
      doc
        .fontSize(12)
        .text(`Subject: ${offer.position}`, { align: "center" })
        .moveDown();
      // body
      doc
        .fontSize(12)
        .text(
          applicant.coverLetter ||
            "El candidato no proporcionó carta de presentación"
        );
      doc.moveDown(2);

      //footer
      doc
        .fontSize(10)
        .text(
          `Fecha de aplicación: ${applicant.appliedDate.toLocaleDateString()}`,
          { align: "right" }
        );
      doc.text(`Teléfono de contacto: ${applicant.phone}`, { align: "right" });

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
        owner: recruiterId,
      });

      if (!offer) return res.status(404).json({ msg: "Offer not found" });

      const applicant = offer.applicants.id(applicantId);
      if (!applicant)
        return res.status(404).json({ msg: "Applicant not found" });

      if (!applicant.gdprAccepted) {
        return res.status(403).json({
          msg: "El candidato no ha dado consentimiento para contacto telefónico",
        });
      }

      res.json({
        phone: applicant.phone,
        name: applicant.user.name, // Debería ser poblado en la consulta
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  searchOffers: async (req, res) => {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ msg: "Search query is required" });
    }

    try {
      const regex = new RegExp(q, "i");

      const offers = await Offer.find({
        isDelete: { $ne: true },
        status: "active",
        $or: [
          { position: regex },
          { role: regex },
          { location: regex },
          { company: regex },
          { skills: { $in: [regex] } },
          { description: regex },
          { language: regex },
        ],
      }).populate({
        path: "owner",
        select: "name surname avatar",
        match: { isDeleted: { $ne: true } }
      });

      // Filtrar ofertas que tengan owner válido
      const validOffers = offers.filter(offer => offer.owner !== null);

      res.json(validOffers);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getMatchOffers: async (req, res) => {
    try {
      const matches = await Offer.find({ isDelete: { $ne: false }, status: "active" }).populate({
        path: "owner",
        select: "name surname avatar",
        match: { isDeleted: { $ne: true } }
      });
      res.json(matches);
  }catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  updateMatch: async (req, res) =>{
    try {
      const {offerId} = req.params;
      if(!mongoose.Types.ObjectId.isValid(offerId)) return res.status(400).json({ msg: "Offer id is not valid" });
      const { matches } = req.body;
      const offer = await Offer.findById(offerId);
      if (!offer) return res.status(404).json({ msg: "Offer not found" });
      
      if( !Array.isArray(matches) || matches.length === 0) return res.status(400).json({ msg: "Matches must be an array" });
      for (const match of matches) {
        const {userId, score} = match;
        if(!mongoose.Types.ObjectId.isValid(userId)) {
          consele.warm(`User id ${userId} is not valid`);
          continue;
        } ;
        // 1. Buscar si ya existe un match para este usuario
      const existingMatchIndex = offer.matches.findIndex(m => m.user.toString() === userId);

      if (existingMatchIndex === -1) {
        // 2a. Si NO existe, simplemente lo agregamos (es el primer match)
        offer.matches.push({
          user: new mongoose.Types.ObjectId(userId),
          match: score,
          createdAt: new Date()
        });
        console.log(`[updateMatch] Nuevo match creado para usuario: ${userId}, Score: ${score}`);
      } else {
        // 2b. Si SÍ existe, comparamos los scores
        const existingScore = offer.matches[existingMatchIndex].match;

        if (score >= existingScore) {
          // 3. Solo actualizamos si el nuevo score es MAYOR O IGUAL
          offer.matches[existingMatchIndex] = {
            user: new mongoose.Types.ObjectId(userId),
            match: score,
            createdAt: new Date() // Actualizamos también la fecha
          };
          console.log(`[updateMatch] Match actualizado para usuario: ${userId}. Score anterior: ${existingScore}, Nuevo score: ${score}`);
        } else {
          // 4. Si el nuevo score es más bajo, lo ignoramos
          console.log(`[updateMatch] Match ignorado para usuario: ${userId}. Score existente (${existingScore}) es mayor que el nuevo (${score}).`);
        }
      }
      // --- FIN DE LA NUEVA LÓGICA ---
    }

    await offer.save();
    console.log(`[updateMatch] Oferta ${offerId} guardada con éxito. Total de matches: ${offer.matches.length}`);

    return res.status(200).json({
      msg: "Matches procesados correctamente",
      updatedOffer: {
        _id: offer._id,
        matches: offer.matches
      }
    });

  } catch (error) {
    console.error(`[updateMatch] Error crítico:`, error.message);
    return res.status(500).json({ msg: "Error al actualizar los matches", error: error.message });
  }
},
};