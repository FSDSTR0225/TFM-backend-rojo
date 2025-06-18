const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  position: { type: String, required: true },
  role: { type: String },
  location: { type: String },
  contractType: [{ type: String }],
  company: { type: String, required: true },
  salary: { type: Number },
  skills: [{ type: String }],
  description: { type: String },
  language: { type: String },
  isDelete: {type: Boolean, default: false},
  deleteAt: { type: Date, default: null },
  status: { type: String, enum: ['active', 'closed', 'draft'], default: 'active' },

  // Reference to the recruiter who created the offer
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },

  // Reference to applicants with application metadata
  applicants: [{
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      },
      appliedDate: { type: Date, default: Date.now },
      status: { 
          type: String, 
          enum: ['pending', 'reviewed', 'interviewed', 'rejected', 'accepted'], 
          default: 'pending' 
      },
      coverLetter: { type: String },  // Cambiado de coverLatter a coverLetter
  phone: { type: String },  // Nuevo campo para teléfono
  gdprAccepted: { type: Boolean, default: false } // Nuevo campo GDPR
}, {
  timestamps: true
}]
}) ;

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
