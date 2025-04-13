const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

        email: { type: String, unique: true },
        password: { type: String}, // Hash seguro
        nombre: {type: String},
        apellidos: {type: String},
        avatar:{type: String},
        tituloProfesional:{type:String},
        descripcion:{type:String},
        habilidades:{type: Array},
        experiencia:[
            {
                empresa:{type:String},
                puesto:{type:String},
                fechaInicio:{type:Date},
                fechaFin:{type:Date}
            }
        ],
        estudios:[
            {
                nombreInstituto:{type:String},
                fechaInicio:{type:Date},
                fechaFinal:{type:Date},
                titulacion:{type:String},
                descripcion:{type:String},
                ubicación:{type:String},
                multimedia:{type:String}
            }
        ],
        roles: { type: String, enum: ['developer', 'recruiter'] },
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;