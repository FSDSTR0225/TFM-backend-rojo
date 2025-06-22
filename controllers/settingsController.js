const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
// const transporter = require("../controllers/emailController");
// const { generateWelcomeEmail } = require("../utils/emailTemplate");

module.exports = {

  changePasssword: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
