const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const transporter = require("../controllers/emailController");
const { UpdatePasswordEmail, DeleteAccount } = require("../utils/emailTemplate");

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
          subject: "Your password has been changed!",
          text: `Your password has been changed!`,
          html: UpdatePasswordEmail(user.avatar, user.email),
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
  },

  deleteUser: async (req, res) => {
      try {
        const userId = req.user.id;

        // Buscar el usuario
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        // Eliminar el usuario
        await User.findByIdAndDelete(userId);

        // Opcional: Enviar email de confirmación de eliminación
        try {
          await transporter.sendMail({
            from: `"Codepply" <codepply.team@gmail.com>`,
            to: user.email,
            subject: "Account deleted successfully",
            text: `Your account has been permanently deleted.`,
            html: DeleteAccount(user.name, user.email),
          });
          console.log("Deletion confirmation email sent");
        } catch (mailError) {
          console.error("Error sending deletion confirmation email:", mailError);
          // No retornamos error aquí porque la eliminación ya se completó
        }

        res.status(200).json({ 
          msg: 'User account deleted successfully' 
        });
        
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ msg: error.message });
      }
    }

};

