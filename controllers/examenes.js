const Examenes = require('../models/Examenes');

// @desc        get all examenes
// @route       GET /api/v1/alumnos/examenes
// @access      public
exports.getExamenes = async (req, res, next) => {
    try {
        const examenes = await Examenes.find();
        
        return res.status(200).json({
            success: true,
            count: examenes.length,
            data: examenes
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc        add examenes
// @route       POST /api/v1/alumnos/exameness
// @access      public
exports.addExamen = async (req, res, next) => {
    console.log('addExamen');
    try {
        const { idExamen, nivel, letra, nombre, active } = req.body;
        const existeidExamen = await Examenes.findOne({ idExamen: idExamen});
        if(!existeidExamen){
            const examen = await Examenes.create(req.body);
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

// @desc        update examen
// @route       POST /api/v1/alumnos/updateExamen
// @access      public
exports.updateExamen = async (req, res, next) => {
    console.log('updateExamen');
    try {
        const { idExamen, nivel, letra, nombre, active } = req.body;

        const examen = await Examenes.findOne({idExamen: idExamen});
        if(!examen) {
            return res.status(404).json({
                success: false,
                error: 'No se encontro examen'
            });
        }
        await Examenes.updateOne({ idExamen: idExamen }, {
            "nivel": (nivel ? nivel : examen.nivel),
            "letra": (letra ? letra : examen.letra),
            "nombre": (nombre ? nombre : examen.nombre),
            "active": (active ? active : examen.active)
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
// @route       DELETE /api/v1/alumnos/examenes/:id
// @access      public
exports.deleteExamen = async (req, res, next) => {
    try {
        const examen = await Examenes.findById(req.params.id);
        if(!examen) {
            return res.status(404).json({
                success: false,
                error: 'No se encontro examen'
            });
        }
        await Examenes.remove({ _id: req.params.id });
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