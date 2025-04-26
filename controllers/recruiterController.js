const mongoose = require("mongoose");
const Recruiter = require('../models/userModel');

module.exports = {
    getRecruiters: async (req, res) => {
        try {
            const recruiters = await Recruiter.find({ "roles.type": "recruiter" });
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
            console.log("Usuario autenticado:", req.user); // Log del usuario autenticado
            console.log("Datos recibidos del frontend:", req.body); // Log de los datos recibidos
            const userId = req.user.id;
            const datosRecruiter = req.body;
            console.log('Datos obtenidos del Front: ', datosRecruiter);
            if (!datosRecruiter) return res.status(400).json({ msg: 'Some required fields are missing' });
            const recruiter = await Recruiter.findByIdAndUpdate(userId,
                // { "description": description},
                { "roles.recruiter": datosRecruiter },
                { new: true });
            return res.status(200).json({ msg: 'Recruiter updated', recruiter });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

