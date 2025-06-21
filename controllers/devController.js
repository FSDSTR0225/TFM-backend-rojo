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
 getDevById: async (req, res) => {
    try {
      const dev = await User.findById(req.params.id);
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
          github,
          skills,
          languages
        } = {}
      } = {}
    } = req.body;

    // Validación más flexible
    if (!_id) {
      return res.status(400).json({ msg: '_id is required' });
    }

    // Validar que languages sea un array válido (pero permitir array vacío)
    if (languages && !Array.isArray(languages)) {
      return res.status(400).json({ msg: 'Languages must be an array' });
    }

    // Validar que skills sea un array válido (pero permitir array vacío)
    if (skills && !Array.isArray(skills)) {
      return res.status(400).json({ msg: 'Skills must be an array' });
    }
  
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

    // Inicializar developer si no existe
    if (!user.role.developer) {
      user.role.developer = {};
    }

    const updateFields = {};
    
    // Campos de nivel superior (solo si vienen en el request)
    if (name !== undefined) updateFields.name = name;
    if (avatar !== undefined) updateFields.avatar = avatar;
    if (surname !== undefined) updateFields.surname = surname;
    if (description !== undefined) updateFields.description = description;

        // Campos del developer usando dot notation
    if (professionalPosition !== undefined) updateFields['role.developer.professionalPosition'] = professionalPosition;
    if (experienceYears !== undefined) updateFields['role.developer.experienceYears'] = experienceYears;
    if (location !== undefined) updateFields['role.developer.location'] = location;
    if (linkedin !== undefined) updateFields['role.developer.linkedin'] = linkedin;
    if (github !== undefined) updateFields['role.developer.github'] = github;

    // Arrays: filtrar valores vacíos
    if (skills !== undefined && Array.isArray(skills)) {
      const filteredSkills = skills.filter(skill => skill && skill.trim() !== '');
      updateFields['role.developer.skills'] = filteredSkills;
    }
    
    if (languages !== undefined && Array.isArray(languages)) {
      const filteredLanguages = languages.filter(lang => 
        lang && lang.language && lang.language.trim() !== '' && 
        lang.languageLevel && lang.languageLevel.trim() !== ''
      );
      updateFields['role.developer.languages'] = filteredLanguages;
    }

    console.log('Update fields:', updateFields); // Debug

    const updatedUser = await User.findByIdAndUpdate(
      _id, 
      updateFields, 
      { 
        new: true, 
        runValidators: true,
        upsert: false 
      }
    );
  console.log ('Updated user:', updatedUser); // Debug

    res.status(200).json({ 
      msg: 'Developer profile updated successfully', 
      user: updatedUser 
    });
    
  } catch (error) {
    console.error('Error updating dev profile:', error);
    res.status(500).json({ msg: error.message });
  }
}

}