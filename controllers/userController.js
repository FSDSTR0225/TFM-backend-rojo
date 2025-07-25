const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const transporter = require("../controllers/emailController");
const { generateWelcomeEmail } = require("../utils/emailTemplate");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;

      let user = await User.findOne({ email: email,  isDeleted: { $ne: true } });

      if (!user) {
        return res.status(404).json({ msg: "User does not exist" });
      }

      // if (user.isDeleted) {
      //   return res.status(403).json({ msg: "User account is deleted" });
      // }
      
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(404).json({ msg: "User does not exist" });
      }
      const { password: _, ...userWithoutPassword } = user.toObject();
      const token = generateToken(userWithoutPassword);

      return res.status(200).json({
        msg: "User logged in successfully",
        token,
        user: userWithoutPassword,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  register: async (req, res) => {
    try {
      const { name, surname, email, password, role } = req.body;
      console.log(req.body);
      // Validate required fields
      if (!name || !surname || !password || !email || !role) {
        return res
          .status(400)
          .json({ msg: "Some required fields are missing" });
      }
      // Check if the user already exists
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(409).json({ msg: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        name,
        surname,
        email,
        password: hashedPassword,
        role: {
          type: role,
        },
      });
      console.log("Nuevo usuario creado:", newUser);

      // Save the user
      await newUser.save();

      console.log("Transporter:", typeof transporter);

      // Enviar email
      try {
        const info = await transporter.sendMail({
          from: `"Codepply" <codepply.team@gmail.com>`,
          to: newUser.email,
          subject: "Welcome to Codepply!",
          text: `Hey ${newUser.name}, thanks to join Codepply!`,
          html: generateWelcomeEmail(newUser.name),
        });
        console.log("Mail enviado correctamente:", info);
      } catch (mailError) {
        console.error("Error enviando el correo:", mailError);
        // opcional: podrías continuar sin cortar el registro, o cortar aquí si es crítico
        return res
          .status(500)
          .json({ msg: "Error enviando correo de bienvenida" });
      }

      const { password: _, ...userData } = newUser.toObject();

      res.status(201).json({
        msg: "User created successfully",
        user: userData,
      });
    } catch (error) {
      console.error("Error en register:", error); // para ver error completo en consola
      res.status(500).json({ error: error.message });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  forgotPasswordEmail: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();
  
    const resetUrl = `${process.env.SOCKET_URL}reset-password/${token}`;
  
    try {
      await transporter.sendMail({
        from: `"Codepply" <codepply.team@gmail.com>`,
        to: user.email,
        subject: "Recover Codepply password",
        html: `
          <p>Click the following link to reset your Codepply password:</p>
          <a href="${resetUrl}">Change your Codepply password</a>
          <p>This link will expire in 1 hour.</p>
        `,
      });
  
      res.status(200).json({ message: "Recovery email sent" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ msg: "Invalid or Expired Token" });
      }

      // Hashear nueva contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Guardar
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.status(200).json({ msg: "Password updated successfully" });
    } catch (error) {
      console.error("Error in resetPassword:", error);
      res.status(500).json({ msg: "Server Error" });
    }
  },
};
