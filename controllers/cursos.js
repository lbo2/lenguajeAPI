const Cursos = require('../models/Cursos');

// @desc        get all cursos
// @route       GET /api/v1/alumnos/cursos
// @access      public
exports.getCursos = async (req, res, next) => {
    try {
        const cursos = await Cursos.find();
        
        return res.status(200).json({
            success: true,
            count: cursos.length,
            data: cursos
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc        add curso
// @route       POST /api/v1/alumnos/cursos
// @access      public
exports.addCurso = async (req, res, next) => {
    console.log('addCurso');
    try {
        const { idCurso, nivel, letra, nombre } = req.body;
        const existeIdCurso = await Cursos.findOne({ idCurso: idCurso});
        const existeCurso = await Cursos.findOne({ nivel: nivel, letra: letra});
        if(!existeCurso && !existeIdCurso){
            const curso = await Cursos.create(req.body);
            return res.status(201).json({
                success: true,
                data: curso
            });
        } else {
            return res.status(400).json({
                success: false,
                error: 'Ya existe curso'
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

// @desc        update curso
// @route       POST /api/v1/alumnos/updateCurso
// @access      public
exports.updateCurso = async (req, res, next) => {
    console.log('updateCurso');
    try {
        const { idCurso, nivel, letra, nombre } = req.body;

        const curso = await Cursos.findOne({idCurso: idCurso});
        if(!curso) {
            return res.status(404).json({
                success: false,
                error: 'No se encontro curso'
            });
        }
        await Cursos.updateOne({ idCurso: idCurso }, {
            "nivel": (nivel ? nivel : curso.nivel),
            "letra": (letra ? letra : curso.letra),
            "nombre": (nombre ? nombre : curso.nombre)
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

// @desc        delete curso
// @route       DELETE /api/v1/alumnos/cursos/:id
// @access      public
exports.deleteCurso = async (req, res, next) => {
    try {
        const curso = await Cursos.findById(req.params.id);
        if(!curso) {
            return res.status(404).json({
                success: false,
                error: 'No se encontro curso'
            });
        }
        await Cursos.remove({ _id: req.params.id });
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