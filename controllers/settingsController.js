const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const transporter = require("../controllers/emailController");
const { UpdatePasswordEmail } = require("../utils/emailTemplate");

module.exports = {

  getSettings: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId).select('-password');

      if(!user) {
        return res.status(404).json({"msg":"User not found"});
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  updatePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;
  
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ msg: 'OLD password and new password are required' });
      }

      const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
    
      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
          return res.status(400).json({ msg: 'Current password is incorrect' });
        }
      
      // Hashear la nueva contraseña
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Actualizar la contraseña
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { password: hashedNewPassword },
        {
          new: true,
          runValidators: true,
          select: '-password' // No devolver la contraseña en la respuesta
        }
      );

      console.log("Transporter:", typeof transporter);
      
      // Enviar email
      try {
        const info = await transporter.sendMail({
          from: `"Codepply" <codepply.team@gmail.com>`,
          to: user.email,
          subject: "Has cambiado la contraseña mostruo!",
          text: `Has cambiado la contraseña mostruo!`,
          html: UpdatePasswordEmail(user.name, user.avatar, user.email),
        });
        console.log("Mail enviado correctamente:", info);
      } catch (mailError) {
        console.error("Error enviando el correo:", mailError);
        // opcional: podrías continuar sin cortar el registro, o cortar aquí si es crítico
        return res
          .status(500)
          .json({ msg: "Error enviando correo de bienvenida" });
      }
  
      res.status(200).json({ 
        msg: 'Developer password updated successfully', 
        user: updatedUser 
      });
      
    } catch (error) {
      console.error('Error updating dev password:', error);
      res.status(500).json({ msg: error.message });
    }
  }

};
