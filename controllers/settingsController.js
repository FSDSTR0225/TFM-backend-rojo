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

      // Excluir usuarios eliminados (soft delete)
      const user = await User.findOne({ 
        _id: userId, 
        isDeleted: { $ne: true } 
      }).select('-password');

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

      // Verificar que el usuario no esté eliminado
      const user = await User.findOne({ 
        _id: userId, 
        isDeleted: { $ne: true } 
      });
      
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

  // Cambiar a soft delete
  softDeleteUser: async (req, res) => {
    try {
      const userId = req.user.id;

      // Buscar el usuario (que no esté ya eliminado)
      const user = await User.findOne({ 
        _id: userId, 
        isDeleted: { $ne: true } 
      });
      
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Marcar como eliminado (soft delete)
      user.isDeleted = true;
      user.deletedAt = new Date();
      await user.save();

      // Opcional: Enviar email de confirmación de eliminación
      try {
        await transporter.sendMail({
          from: `"Codepply" <codepply.team@gmail.com>`,
          to: user.email,
          subject: "Account deleted successfully",
          text: `Your account has been deactivated.`,
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
  },

  updateUserAccount: async (req, res) => {
    try {
      const {
        _id,
        phone,
        name,
        surname,
        birthDate,
        role: {
          developer: {
            location: developerLocation
          } = {},
          recruiter: {
            location: recruiterLocation
          } = {},
        } = {},
      } = req.body;

      if (!_id) {
        return res.status(400).json({ msg: "_id is required" });
      }

      // Verificar que el usuario no esté eliminado
      const user = await User.findOne({ 
        _id: _id, 
        isDeleted: { $ne: true } 
      });
      
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (!user.role || !user.role.type) {
        return res.status(400).json({ msg: "User role type is missing" });
      }

      const updateFields = {};

      // Campos básicos
      if (name !== undefined) updateFields.name = name;
      if (surname !== undefined) updateFields.surname = surname;
      if (phone !== undefined) updateFields.phone = phone;
      if (birthDate !== undefined) updateFields.birthDate = birthDate;

      // Manejar location según el tipo de rol
      const userRoleType = user.role.type;
      
      if (userRoleType === 'developer' && developerLocation !== undefined) {
        updateFields['role.developer.location'] = developerLocation;
      } else if (userRoleType === 'recruiter' && recruiterLocation !== undefined) {
        updateFields['role.recruiter.location'] = recruiterLocation;
      }

      updateFields.hasCompletedOnboarding = true;

      const updatedUser = await User.findByIdAndUpdate(_id, updateFields, {
        new: true,
        runValidators: true,
        upsert: false,
      });

      res.status(200).json({
        msg: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ msg: error.message });
    }
  }
};