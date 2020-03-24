const Preguntas = require('../models/Preguntas');

// @desc        get all preguntas
// @route       GET /api/v1/alumnos/preguntas
// @access      public
exports.getPreguntas = async (req, res, next) => {
    try {
        const preguntas = await Preguntas.find();
        
        return res.status(200).json({
            success: true,
            count: preguntas.length,
            data: preguntas
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc        add preguntas
// @route       POST /api/v1/alumnos/preguntas
// @access      public
exports.addPregunta = async (req, res, next) => {
    console.log('addPregunta');
    try {
        const { idExamen, preguntas } = req.body;
        req.body.createdAt = Date.now();
        req.body.updatedAt = Date.now();
        const existeidExamen = await Preguntas.findOne({ idExamen: idExamen});
        if(!existeidExamen){
            const examen = await Preguntas.create(req.body);
            return res.status(201).json({
                success: true,
                data: examen
            });
        } else {
            return res.status(400).json({
                success: false,
                error: 'Ya existe examen'
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

// @desc        update pregunta
// @route       POST /api/v1/alumnos/preguntas/updatePregunta
// @access      public
exports.updatePregunta = async (req, res, next) => {
    console.log('updatePregunta');
    try {
        const { idExamen, pregunta } = req.body;

        const response = await Preguntas.findOne({"idExamen": idExamen, "preguntas.idPregunta": pregunta.idPregunta});
        console.log('respuesta update', response)
        if(!response) {
            return res.status(404).json({
                success: false,
                error: 'No se encontro examen'
            });
        }
        let preguntasModificadas = [];
        pregunta.updatedAt = Date.now();
        pregunta.alternativas.forEach(alt => {
            alt.updatedAt = Date.now()
        });

        response.preguntas.forEach(preg => {
            if(preg.idPregunta === pregunta.idPregunta) {
                pregunta.updatedAt = Date.now();
                preguntasModificadas.push(pregunta);
            } else {
                preguntasModificadas.push(preg);
            }
        });
        await Preguntas.updateOne({ "idExamen": idExamen, "preguntas.idPregunta": pregunta.idPregunta }, {
            "idExamen": response.idExamen,
            "preguntas": preguntasModificadas,
            "updatedAt": Date.now()
        });
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}

// @desc        delete examen
// @route       DELETE /api/v1/alumnos/preguntas/:id
// @access      public
exports.deletePregunta = async (req, res, next) => {
    try {
        const examen = await Preguntas.findById(req.params.id);
        if(!examen) {
            return res.status(404).json({
                success: false,
                error: 'No se encontro examen'
            });
        }
        await Preguntas.remove({ _id: req.params.id });
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}