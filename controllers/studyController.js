const mongoose = require("mongoose");
const User = require('../models/userModel');

module.exports = {
getStudies : async (req,res) => {
    try {
        const studies = await User.find({});
        res.json(studies);
        } catch (error) {
            res.status(500).json({ msg: ""});
        }
},

createStudy: async(req, res) => {
    try {
        const userId = req.user.id
        const {instituteName, startDate, endDate, degree, description, location, multimedia} = req.body

        const study = await User.create({
          instituteName, startDate, endDate, degree, description, location, multimedia, owner: userId
        })

        res.status(201).json({
            msg: 'Study created successfully',
            study
        })
    } catch (error) {
        return res.status(500).json({ msg: error.message});
    }
},

updateStudy: async(req, res) => {
    try {
    const studyId = req.params.id
    const userId = req.user.id
    const studyNewData = req.body
    const study = await User.findById(studyId)
    if (!study) {
        return res.status(404).json({ msg: 'Study not found' });
    }
    if(study.owner.toString() !== userId ) return res.status(403).json({ msg: 'Some required fields are missing' })
    const updatedStudy = await User.findByIdAndUpdate(studyId, {...studyNewData}, {new:true})
    return res.status(200).json({msg:'Study updated', updatedStudy})
    } 
    catch (error) {
        return  res.status(500).json({ msg: error.message});
    }
}
};