const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken")

module.exports = {
  login: async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;

      let user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).json({ msg: 'User does not exist' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(404).json({ msg: 'User does not exist' });
      }
      const { password: _, ...rest } = user.toObject();
      const token = generateToken(user)
      res.status(200).json({
        msg: 'User logged in successfully',
        user: rest,
        token,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  register: async (req, res) => {
    try {
      const { name, surname, email, password, roles, birthDate } = req.body; 

      // Validate required fields
      if (!name || !surname || !password || !email || !roles || !birthDate) { 
        res.status(400).json({ msg: 'Some required fields are missing' });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        res.status(409).json({ msg: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        name, 
        surname, 
        email,
        password: hashedPassword, 
        roles,
        birthDate,
      });

      // Save the user
      await newUser.save();
      const { password: _, ...userData } = newUser.toObject();
      res.status(201).json({
        msg: 'User created successfully',
        user: userData,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};