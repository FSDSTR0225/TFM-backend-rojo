const mongoose = require("mongoose");
const Experience = require('../models/experienceModel');

module.exports = {

getExperienceById: async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ msg: 'Experiencia no encontrada' });
    }
    res.status(200).json({ experience });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
},

getExperiencesByOwner: async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const experiences = await Experience.find({ owner: ownerId, isDeleted: { $ne: true } });
    res.status(200).json({ experiences });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
},

createExperience: async(req, res)=>{
    try {
      const userId = req.user.id;
      const experience = { ...req.body, owner: userId };
      console.log('Frontend value: ', experience);
      const newExperience = new Experience(experience);
            await newExperience.save();
            res.json({ project: newProject, msg: 'Experience created successfully' });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
},

updateExperience: async(req, res) => {
    try {
        const experienceId = req.params.id;
        const userId = req.user.id;
        const experienceNewData = req.body;

        const experience = await Experience.findById(experienceId)
        if (!experience) {
            return res.status(404).json({ msg: 'Experience not found' });
        }
        if(experience.owner.toString() !== userId ) {
            return res.status(403).json({ msg: 'Some required fields are missing' });
        }

        const updatedExperience = await Experience.findByIdAndUpdate(
            experienceId,
            {...experienceNewData},
            {new:true}
        );
        return res.status(200).json({msg:'Experience updated', updatedExperience})

    } catch (error) {
        return  res.status(500).json({ msg: error.message});
    }
},

softDeleteExperience: async (req, res) => {
  try {
    const experienceId = req.params.id;
    const userId = req.user.id;

    const experience = await Experience.findById(experienceId);
    if (!experience) return res.status(404).json({ msg: 'Experience not found' });
    if (experience.owner.toString() !== userId) return res.status(403).json({ msg: 'Unauthorized' });

    experience.isDeleted = true;
    await experience.save();

    res.status(200).json({ msg: 'Experience deleted (soft)' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
}