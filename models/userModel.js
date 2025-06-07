const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String },
  birthDate: { type: String },
  phone: { type: String },
  avatar: { type: String },
  description: { type: String },
  role: {
    type: { type: String, required: true, enum: ['developer', 'recruiter'] },
    developer: {
      professionalPosition: { type: String },
      experienceYears: { type: String },
      location: { type: String },
      linkedin: { type: String },
      github: { type: String },
      skills: [{ type: String }],
      languages: [
        {
          language: { type: String },
          languageLevel: { type: String },
        }
      ],
      experiences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
      projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
      studies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Study' }],
      // registeredOffers: [
      //   {
      //     offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
      //     appliedDate: { type: Date, default: Date.now },
      //     status: {
      //       type: String,
      //       enum: ['pending', 'reviewed', 'interviewed', 'rejected', 'accepted'],
      //       default: 'pending',
      //     },
      //   }
      // ]
    },
    recruiter: {
      companyName: { type: String },
      location: { type: String },
      sector: { type: String },
      website: { type: String },
      contact: {
        email: { type: String },
        phone: { type: String },
      },
      multimedia: { type: String },
      createdOffers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
    },

  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
