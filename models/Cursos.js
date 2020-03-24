const mongoose = require('mongoose');

const CursosSchema = new mongoose.Schema({
    idCurso: {
        type: Number,
        required: [true, 'Debes ingresar id de curso']
    },
    nivel: {
        type: Number,
        trim: true,
        required: [true, 'Debes ingresar un nivel']
    },
    letra: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar una letra']
    },
    nombre: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar un nombre']
    }
},
{
  collection: 'cursos',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

module.exports = mongoose.model('cursos', CursosSchema);