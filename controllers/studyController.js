const mongoose = require("mongoose");
const Study = require('../models/studiesModel');

module.exports = {

getStudiesById: async (req, res) => {
  try {
    const study = await Study.findById(req.params.id);
    if (!study) {
      return res.status(404).json({ msg: 'Study no encontrada' });
    }
    res.status(200).json({ study });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
},

// ✅ Obtener experiencias por usuario (owner)
getStudiesByOwner: async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const studies = await Study.find({ owner: ownerId });
    res.status(200).json({ studies });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
},

createStudy: async(req, res) => {
    try {
        const userId = req.user.id
        const {instituteName, startDate, endDate, degree, description, location, multimedia} = req.body

        const study = await Study.create({
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
    const study = await Study.findById(studyId)
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