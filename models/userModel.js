const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  name: { type: String, required: true },
  surname: { type: String, required: true },
  birthDate: { type: Date, required: true },
  phone: { type: String },
  avatar: { type: String },
  description: { type: String },
  roles: {
    tipo: { type: String, required: true, enum: ['developer', 'recruiter'] },
    developer: {
      professionalPosition: { type: String },
      languages: [
        {
        language: { type: String },
        languagelevel: { type: String },
        }
      ],
      skills: { type: Array },
      experience: [
        {
          company: { type: String },
          position: { type: String },
          startDate: { type: Date },
          endDate: { type: Date },
        },
      ],
      projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
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
      registeredOffers: [
        {
          offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
          appliedDate: { type: Date, default: Date.now },
          status: { type: String, enum: ['pending', 'reviewed', 'interviewed', 'rejected', 'accepted'], default: 'pending' },
        }
      ]
    },
    recruiter: {
          logo: { type: String },
          companyName: { type: String },
          description: { type: String },
          location: { type: String },
          sector: { type: String },
          website: { type: String },
          contact: [
              {
                  email: { type: String },
                  phone: { type: String },
              }
          ],
          multimedia: { type: String }
      },
    createdOffers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }]
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;