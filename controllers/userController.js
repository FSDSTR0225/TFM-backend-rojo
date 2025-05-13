const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken")

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

      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ msg: 'User does not exist' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
       return res.status(404).json({ msg: 'User does not exist' });
      }
      const { password: _, ...rest } = user.toObject();
      const token = generateToken(rest);
      return res.status(200).json({
        msg: 'User logged in successfully',
        token,
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
        return res.status(400).json({ msg: 'Some required fields are missing' });
      }
      // Check if the user already exists
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
       return res.status(409).json({ msg: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        name,
        surname,
        email,
        password: hashedPassword, 
        role:{
          type:role
        },
      });

      // Save the user
      await newUser.save();
      const { password: _, ...userData } = newUser.toObject();
      res.status(201).json({
        msg: 'User created successfully',
        user: userData,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },


  getUserProfile:async(req,res)=>{
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }



};