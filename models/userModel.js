const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: { type: String, unique: true },
    password: { type: String }, // Secure hash
    name: { type: String }, 
    surname: { type: String }, 
    avatar: { type: String },
    professionalPosition: { type: String },
    description: { type: String },
    skills: { type: Array },
    experience: [
      {
        company: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    studies: [
      {
        instituteName: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        degree: { type: String },
        description: { type: String },
        location: { type: String },
        multimedia: { type: String },
      },
    ],
    roles: { type: String, enum: ['developer', 'recruiter'] },
  }, {
    timestamps: true
  });

const User = mongoose.model('User', userSchema);
module.exports = User;