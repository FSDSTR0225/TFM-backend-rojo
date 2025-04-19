const mongoose = require("mongoose");
const Recruiter = require('../models/userModel');

module.exports = {
    getRecruiters : async (req,res) => {
        try {
            const recruiters = await Recruiter.find({"roles.type": "recruiter"});
            res.json(recruiters);
        
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    },

    getRecruiterById : async (req,res) => {
        try {
            const recruiter = await Recruiter.findById(req.params.id);
            res.json(recruiter);
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    }
}

