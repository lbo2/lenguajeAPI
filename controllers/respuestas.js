const Respuestas = require('../models/Respuestas');

// @desc        get all respuestas by Alumno y Examen
// @route       POST /api/v1/alumnos/respuestas
// @access      public
exports.getRespuestas = async (req, res, next) => {
    try {
        const { rut, idExamen } = req.body;
        const respuestas = await Respuestas.find({ rut: rut, idExamen: idExamen });
        if(respuestas) {
            return res.status(200).json({
                success: true,
                data: respuestas
            })
        } else {
            return res.status(400).json({
                success: false,
                error: 'No existe match con rut y examen'
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc        add respuesta
// @route       POST /api/v1/alumnos/respuestas
// @access      public
exports.addRespuesta = async (req, res, next) => {
    console.log('addRespuesta');
    try {
        const { rut, idExamen, idPregunta, idAlternativa } = req.body;
        const existeRespuesta = await Respuestas.findOne({ rut: rut, idExamen: idExamen, idPregunta: idPregunta });
        if(!existeRespuesta){
            const respuesta = await Respuestas.create(req.body);
            return res.status(201).json({
                success: true,
                data: respuesta
            });
        } else {
            const respuesta = await Respuestas.updateOne({ rut: rut, idExamen: idExamen, idPregunta: idPregunta }, {
                "idAlternativa": idAlternativa
            });
            return res.status(201).json({
                success: true,
                data: respuesta
            });
        }
    } catch (err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
}