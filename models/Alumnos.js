const mongoose = require('mongoose');

const AlumnosSchema = new mongoose.Schema({
    rut: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar el RUT']
    },
    nombres: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar un nombre']
    },
    apellidos: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar un apellido']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar un password']
    },
    curso: {
        type: String,
        trim: true
    },
    mail: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar un tipo de usuario']
    }
},
{
  collection: 'users',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

module.exports = mongoose.model('alumnos', AlumnosSchema);