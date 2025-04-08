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
        expereciencia:[
            {
                empresa:{type:String},
                puesto:{type:String},
                fechaInicio:{type:Date},
                fechaFin:{type:Date}
            }
        ],
        proyectos:[
            {
                nombre:{type:String},
                descripcion:{type:String},
                tecnologias_utilizadas:{type: Array},
            }
        ],
        roles: { type: String, enum: ['developer', 'recruiter'] },
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;