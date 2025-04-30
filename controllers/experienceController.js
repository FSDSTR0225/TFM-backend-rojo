const mongoose = require("mongoose");
const User = require('../models/userModel');

module.exports = {

createExperiences: async(req, res)=>{
    try {
      const userId = req.user.id
      const {company, position, startDate, endDate, owner: userId} = req.body

      const experience = await User.create({
        company, position, startDate, endDate, owner: userId
      })

      res.status(201).json({
          msg: 'Experience created successfully',
          experience
      })
  } catch (error) {
      res.status(500).json({ msg: error.message});
  }
},

    updateExperiences: async(req, res) => {
        try {
            const experienceId = req.params.id
            const userId = req.user.id
            const experienceNewData = req.body
            const experience = await User.findById(experienceId)
            if (!experience) {
                return res.status(404).json({ msg: 'Experience not found' });
              }
            if(experience.owner.toString() !== userId ) return res.status(403).json({ msg: 'Some required fields are missing' })
            const updatedExperience = await User.findByIdAndUpdate(experienceId, {...experienceNewData}, {new:true})
            return res.status(200).json({msg:'Experience updated', updatedExperience})
        } catch (error) {
            return  res.status(500).json({ msg: error.message});
        }
    }
}