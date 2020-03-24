const mongoose = require('mongoose');
var utc = new Date();
utc.setHours( utc.getHours() - 3);

const AlternativasSchema = new mongoose.Schema({
    idAlternativa: {
        type: Number,
        required: [true, 'Debes ingresar id de alternativa']
    },
    alternativaTexto: {
        type: String,
        trim: true,
        required: [true, 'debes ingresar un texto para la alternativa']
    },
    correcta: {
        type: Boolean,
        require: [true, 'debes indicar si la alternativa es correcta']
    },
    createdAt: {
        type: Date,
        require: [true, 'Debes ingresar una fecha de creacion']
    },
    updatedAt: {
        type: Date,
        require: [true, 'Debes ingresar una fecha de actualizacion']
    }
});

const PreguntasSchema = new mongoose.Schema({
    idPregunta: {
        type: Number,
        required: [true, 'Debes ingresar id de pregunta']
    },
    preguntaTexto: {
        type: String,
        trim: true,
        required: [true, 'debes ingresar un texto para la pregunta']
    },
    alternativas: [AlternativasSchema],
    createdAt: {
        type: Date,
        require: [true, 'Debes ingresar una fecha de creacion']
    },
    updatedAt: {
        type: Date,
        require: [true, 'Debes ingresar una fecha de actualizacion']
    }
});

const PreguntasRespuestasSchema = new mongoose.Schema({
    idExamen: {
        type: Number,
        required: [true, 'Debes ingresar id de examen']
    },
    preguntas: [PreguntasSchema],
    createdAt: {
        type: Date,
        require: [true, 'Debes ingresar una fecha de creacion']
    },
    updatedAt: {
        type: Date,
        require: [true, 'Debes ingresar una fecha de actualizacion']
    }
},
{
    collection: 'preguntas'
});



module.exports = mongoose.model('preguntas', PreguntasRespuestasSchema);