const mongoose = require("mongoose");
const Recruiter = require("../models/userModel");
const User = require("../models/userModel");

module.exports = {
  getRecruiters: async (req, res) => {
    try {
      const recruiters = await Recruiter.find({ "role.type": "recruiter" });
      res.json(recruiters);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getRecruiterById: async (req, res) => {
    try {
      const recruiter = await Recruiter.findById(req.params.id);
      res.json(recruiter);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  updateRecruiterProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const body = req.body;

      if (!body.role?.recruiter) {
        return res
          .status(400)
          .json({ msg: "Recruiter data is missing in request." });
      }

      const recruiter = body.role.recruiter;

      // Datos raíz usuario
      let updateData = {
        avatar: body.avatar,
        description: body.description,
        name: body.name,
        surname: body.surname,
        birthDate: body.birthDate,
        // Aquí dejamos el phone raíz si quieres mantenerlo, si no quitar
        phone: body.phone,
        hasCompletedOnboarding: true,
      };

      // Campos recruiter
      if (recruiter.companyName)
        updateData["role.recruiter.companyName"] = recruiter.companyName;
      if (recruiter.location)
        updateData["role.recruiter.location"] = recruiter.location;
      if (recruiter.sector)
        updateData["role.recruiter.sector"] = recruiter.sector;
      if (recruiter.website)
        updateData["role.recruiter.website"] = recruiter.website;
      if (recruiter.multimedia)
        updateData["role.recruiter.multimedia"] = recruiter.multimedia;

      // Contacto recruiter (email y phone dentro de contact)
      if (
        recruiter.contact &&
        typeof recruiter.contact === "object" &&
        !Array.isArray(recruiter.contact)
      ) {
        if (recruiter.contact.email)
          updateData["role.recruiter.contact.email"] = recruiter.contact.email;
        if (recruiter.contact.phone)
          updateData["role.recruiter.contact.phone"] = recruiter.contact.phone;
      }

      // createdOffers (si fuera a actualizar)
      if (Array.isArray(recruiter.createdOffers)) {
        updateData["role.recruiter.createdOffers"] = recruiter.createdOffers;
      }

      const updated = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      return res
        .status(200)
        .json({ msg: "Recruiter updated", recruiter: updated });
    } catch (error) {
      console.error("❌ Error updating recruiter profile:", error);
      return res.status(500).json({ msg: error.message });
    }
  },
};
