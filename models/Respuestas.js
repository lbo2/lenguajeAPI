const mongoose = require('mongoose');

const RespuestaSchema = new mongoose.Schema({
    rut: {
        type: String,
        trim: true,
        required: [true, 'Debes ingresar el RUT']
    },
    idExamen: {
        type: Number,
        trim: true,
        required: [true, 'Debes ingresar un id de examen']
    },
    idPregunta: {
        type: Number,
        trim: true,
        required: [true, 'Debes ingresar un id de pregunta']
    },
    idAlternativa: {
        type: Number,
        trim: true,
        required: [true, 'Debes ingresar un id de alternativa']
    }
},
{
  collection: 'respuestas',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

module.exports = mongoose.model('respuestas', RespuestaSchema);