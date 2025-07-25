const mongoose = require("mongoose");
const User = require("../models/userModel"); // Asegúrate de que la ruta sea correcta

module.exports = {
  getDevs: async (req, res) => {
    try {
      const devs = await User.find({ 
        "role.type": "developer",
        isDeleted: { $ne: true }
      });
      res.json(devs);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  //Este código nos muestra el perfil de cada dev
  getDevById: async (req, res) => {
    try {
      const dev = await User.findOne({
        _id: req.params.id,
        isDeleted: { $ne: true }
      });
      return res.json(dev);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateDevProfile: async (req, res) => {
    try {
      const {
        _id,
        avatar,
        description,
        name,
        surname,
        role: {
          developer: {
            professionalPosition,
            experienceYears,
            location,
            linkedin,
            resume,
            github,
            skills,
            languages,
          } = {},
        } = {},
      } = req.body;

      if (!_id) {
        return res.status(400).json({ msg: "_id is required" });
      }

      if (languages && !Array.isArray(languages)) {
        return res.status(400).json({ msg: "Languages must be an array" });
      }

      if (skills && !Array.isArray(skills)) {
        return res.status(400).json({ msg: "Skills must be an array" });
      }

      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (!user.role || !user.role.type) {
        return res.status(400).json({ msg: "User role type is missing" });
      }

      if (user.role.type !== "developer") {
        return res
          .status(400)
          .json({ msg: 'User must have the role of "developer"' });
      }

      if (!user.role.developer) {
        user.role.developer = {};
      }

      const updateFields = {};

      if (name !== undefined) updateFields.name = name;
      if (avatar !== undefined) updateFields.avatar = avatar;
      if (surname !== undefined) updateFields.surname = surname;
      if (description !== undefined) updateFields.description = description;

      if (professionalPosition !== undefined)
        updateFields["role.developer.professionalPosition"] =
          professionalPosition;
      if (resume !== undefined) updateFields["role.developer.resume"] = resume;
      if (experienceYears !== undefined)
        updateFields["role.developer.experienceYears"] = experienceYears;
      if (location !== undefined)
        updateFields["role.developer.location"] = location;
      if (linkedin !== undefined)
        updateFields["role.developer.linkedin"] = linkedin;
      if (github !== undefined) updateFields["role.developer.github"] = github;

      if (skills !== undefined && Array.isArray(skills)) {
        const filteredSkills = skills.filter(
          (skill) => skill && skill.trim() !== ""
        );
        updateFields["role.developer.skills"] = filteredSkills;
      }

      if (languages !== undefined && Array.isArray(languages)) {
        const filteredLanguages = languages.filter(
          (lang) =>
            lang &&
            lang.language &&
            lang.language.trim() !== "" &&
            lang.languageLevel &&
            lang.languageLevel.trim() !== ""
        );
        updateFields["role.developer.languages"] = filteredLanguages;
      }

      updateFields.hasCompletedOnboarding = true;

      const updatedUser = await User.findByIdAndUpdate(_id, updateFields, {
        new: true,
        runValidators: true,
        upsert: false,
      });

      res.status(200).json({
        msg: "Developer profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating dev profile:", error);
      res.status(500).json({ msg: error.message });
    }
  },

  searchDevelopers: async (req, res) => {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ msg: "Search query is required" });
    }

    try {
      const regex = new RegExp(q, "i");

      const developers = await User.find({
        "role.type": "developer",
        isDeleted: { $ne: true },
        $or: [
          { name: regex },
          { surname: regex },
          { description: regex },
          { "role.developer.professionalPosition": regex },
          { "role.developer.location": regex },
          { "role.developer.skills": { $in: [regex] } },
          { "role.developer.languages.language": regex },
        ],
      }).select("-password");

      res.json(developers);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  onboardingdev: async (req, res) => {
    try {
      const userId = req.user.id;
      const body = req.body;

      // Quitamos el chequeo estricto para que no falle si no hay developer
      const developer = body.role?.developer || {};

      let updateData = {
        avatar: body.avatar,
        description: body.description,
        name: body.name,
        surname: body.surname,
        birthDate: body.birthDate,
        phone: body.phone,
        hasCompletedOnboarding: true,
      };

      if (developer.professionalPosition)
        updateData["role.developer.professionalPosition"] =
          developer.professionalPosition;
      if (developer.resume)
        updateData["role.developer.resume"] = developer.resume;
      if (developer.experienceYears)
        updateData["role.developer.experienceYears"] =
          developer.experienceYears;
      if (developer.location)
        updateData["role.developer.location"] = developer.location;
      if (developer.linkedin)
        updateData["role.developer.linkedin"] = developer.linkedin;
      if (developer.github)
        updateData["role.developer.github"] = developer.github;

      if (Array.isArray(developer.skills)) {
        updateData["role.developer.skills"] = developer.skills.filter(
          (skill) => skill && skill.trim() !== ""
        );
      }

      if (Array.isArray(developer.languages)) {
        updateData["role.developer.languages"] = developer.languages.filter(
          (lang) =>
            lang &&
            lang.language &&
            lang.language.trim() !== "" &&
            lang.languageLevel &&
            lang.languageLevel.trim() !== ""
        );
      }

      const updated = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      return res
        .status(200)
        .json({ msg: "Developer updated", developer: updated });
    } catch (error) {
      console.error("❌ Error updating developer profile:", error);
      return res.status(500).json({ msg: error.message });
    }
  },
};
