const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { json } = require("express");

module.exports = {
  login: async (req, res) => {
    //hacer el login
    try {
      let email = req.body.email;
      let password = req.body.password;

      let user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).json({ msj: "El usuario no existe" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(404).json({ msj: "El usuario no existe" });
      }
      const { password: _, ...rest } = user.toObject();
      res.status(201).json({
        msg: "Usuario logeado con exito",
        user: rest,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  register: async (req, res) => {
    try {
      const { nombre, apellidos, email, password, rol, fechaNacimiento  } = req.body;
      //validar campos obligatorios
      //separar en middleware
      if (!nombre || !apellidos || !password || !email || !rol || !fechaNacimiento) {
         res.status(400).json({ msj: "Falta algun dato" });
      }
      //Verificar que no este registrado
      //separar en middleware
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
         res.status(409).json({ msg: "El usuario ya existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        nombre,
        apellidos,
        email,
        password: hashedPassword,
        rol,
        fechaNacimiento
      });
      await newUser.save();
      const { password: _, ...userData } = newUser.toObject();
      res.status(201).json({
        msg: "Usuario creado con exito",
        user: userData,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

};
