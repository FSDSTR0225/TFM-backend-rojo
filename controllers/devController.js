const mongoose = require("mongoose");
const User = require('../models/userModel'); // Asegúrate de que la ruta sea correcta


module.exports = {
  //Desestructurar para no mostrar contraseña
      getDevs : async (req,res) => {
          try {
              const devs = await User.find({"roles.type": "developer"});
              res.json(devs);
          } catch (error) {
              res.status(500).json({ msg: error.message});
          }
      },
  
      //Este código nos muestra el perfil de cada dev
      getDevById : async (req,res) => {
          try {
              const dev = await User.findById(req.params.id);
              res.json(dev);
          } catch (error) {
              res.status(500).json({ msg: error.message});
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
          } = req.body;
      
          if (
            !_id || !professionalPosition || !location || !skills || !languages 
          ) {
            return res.status(400).json({ msg: 'Some required fields are missing' });
          }
      
          const user = await User.findById(_id);
          if (!user) {
            return res.status(404).json({ msg: 'User not found' });
          }
      
          if (!user.roles || !user.roles.type) {
            return res.status(400).json({ msg: 'User role type is missing' });
          }
      
          if (user.roles.type !== 'developer') {
            return res.status(400).json({ msg: 'User must have the role of "developer"' });
          }
  
        const updatedUser= {...user, 
          description,
          roles: {
            developer: {
            professionalPosition,
            location,
            instagram,
            linkedin,
            github,
            skills,
            languages,
            }
          }
        }
          await user.save();
      
          res.status(201).json(user);
        } catch (error) {
          res.status(500).json({ msg: error.message });
        }
      }
}