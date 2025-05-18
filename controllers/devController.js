const mongoose = require("mongoose");
const User = require('../models/userModel'); // Asegúrate de que la ruta sea correcta


module.exports = {
  getDevs : async (req,res) => {
    try {
        const devs = await User.find({"role.type": "developer"});
        res.json(devs);
    } catch (error) {
        res.status(500).json({ msg: error.message});
    }
},

//Este código nos muestra el perfil de cada dev
getDevById : async (req,res) => {
    try {
        const dev = await User.findById(req.params.id);
        return res.json(dev);
    } catch (error) {
        return res.status(500).json({ msg: error.message});
    }
},

updateDevProfile: async (req, res) => {
  try {
    const {
      _id,
      professionalPosition,
      location,
      instagram,
      linkedin,
      github,
      skills,
      languages,
      description,
      name,
      surname,
    } = req.body;
    
    // if (
    //   !_id || !professionalPosition || !location || !skills || !languages 
    // ) {
    //   return res.status(400).json({ msg: 'Some required fields are missing' });
    // }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!user.role || !user.role.type) {
      return res.status(400).json({ msg: 'User role type is missing' });
    }

    if (user.role.type !== 'developer') {
      return res.status(400).json({ msg: 'User must have the role of "developer"' });
    }

const updatedFields = {
      name,
      surname,
      description,
      role: {
        ...user.role,
        developer: {
          ...user.role.developer,
          professionalPosition,
          location,
          instagram,
          linkedin,
          github,
          skills,
          languages
        }
      }
    };
  const updatedUser = await User.findByIdAndUpdate(_id, updatedFields, { new: true });

  res.status(200).json({ msg: 'Developer profile updated successfully', user: updatedUser });
    } catch (error) {
    res.status(500).json({ msg: error.message });
    }
  },

}