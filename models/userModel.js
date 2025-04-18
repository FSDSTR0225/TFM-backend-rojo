const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String }, // Secure hash
  name: { type: String },
  surname: { type: String },
  birthDate: { type: Date },
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
  roles: {
    tipo: { type: String, enum: ['developer', 'recruiter'] },
    developer: {
      posicionProfesional: { type: String },
      habilidades: { type: Array },
      idiomas: { type: Array },
      experiencia: [
        {
          empresa: { type: String },
          puesto: { type: String },
          descripcion: { type: String },
          fechaInicio: { type: Date },
          fechaFin: { type: Date },
          ubicación: { type: String },
        },
      ],
      proyectos: [
        {
          nombre: { type: String },
          descripcion: { type: String },
          urls: { type: Array },
          tecnologias_utilizadas: [{ type: String }],
          duracion: { type: String },
          tipo: [{ type: String }],
          fecha: { type: Date },
          multimedias: { type: String },
        },
      ],
      estudios: [
        {
          nombreInstituto: { type: String },
          fechaInicio: { type: Date },
          fechaFinal: { type: Date },
          titulacion: { type: String },
          descripcion: { type: String },
          ubicación: { type: String },
          multimedia: { type: String },
        },
      ],
      ofertasInscriptas: { type: mongoose.Schema.Types.ObjectId, ref: 'Ofertas' },
    },
    recruiter: {
      Empresa: [
        {
          logo: { type: String },
          nombreEmpresa: { type: String },
          descripcion: { type: String },
          ubicación: { type: String },
          sector: { type: String },
          web: { type: String },
          contacto: [
            {
              correo: { type: String },
              telefono: { type: String },
            },
          ],
          multimedia: { type: String },
        },
      ],
      ofertasCreadas: { type: mongoose.Schema.Types.ObjectId, ref: 'Ofertas' },
    },
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;