const mongoose = require('mongoose');

const ExamenesSchema = new mongoose.Schema({
    idExamen: {
        type: Number,
        required: [true, 'Debes ingresar id de Examen']
    },
    nivel: {
        type: Number,
        trim: true,
        required: [true, 'Debes ingresar un nivel']
    },
    letra: {
        type: String,
        trim: true,
    },
    nombre: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar un nombre']
    },
    active: {
        type: Boolean,
        required: [true, 'Debes ingresar un estado']
    }
},
{
  collection: 'examenes',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

module.exports = mongoose.model('examenes', ExamenesSchema);