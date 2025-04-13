const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  position: { type: String },                  
  role: { type: String },                      
  location: { type: String },                  
  contractType: [{ type: String }],            
  company: { type: String },                   
  salary: { type: Number },                    
  skills: [{ type: String }],                  
  description: { type: String },               
  language: { type: String },                  
  deleteIt: { type: Date },                    
  status: { type: String },                    
  
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',                               
    required: true
  }
}, {
  timestamps: true
});

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
