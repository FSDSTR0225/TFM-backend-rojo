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
    },

    updateRecruiterProfile:async(req,res)=>{
        try{
            const datosRecruiter = req.body;
            console.log('Datos obtenidos del Front: ', datosRecruiter);
            if(!datosRecruiter) return res.status(400).json({ msg: 'Some required fields are missing' });
            const recruiter = await Recruiter.findByIdAndUpdate(req.params.id,
                {"roles.recruiter":datosRecruiter},
                {new:true});
            res.status(200).json({msg:'Recruiter updated', recruiter});
        }catch(error){
            res.status(500).json({ msg: error.message});
        }
    }
}

