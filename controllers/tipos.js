const Tipos = require('../models/Tipos');

// @desc        get all tipos
// @route       GET /api/v1/alumnos/tipos
// @access      public
exports.getTipos = async (req, res, next) => {
    try {
        const tipos = await Tipos.find();
        
        return res.status(200).json({
            success: true,
            count: tipos.length,
            data: tipos
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc        add tipo
// @route       POST /api/v1/alumnos/tipos
// @access      public
exports.addTipo = async (req, res, next) => {
    console.log('addTipo');
    try {
        const { idTipo, tipoNombre } = req.body;
        const existeIdTipo = await Tipos.findOne({ idTipo: idTipo});
        if(!existeIdTipo){
            const tipo = await Tipos.create(req.body);
            return res.status(201).json({
                success: true,
                data: tipo
            });
        } else {
            return res.status(400).json({
                success: false,
                error: 'Ya existe tipo'
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

// @desc        update tipo
// @route       POST /api/v1/alumnos/updateTipo
// @access      public
exports.updateTipo = async (req, res, next) => {
    console.log('updateTipo');
    try {
        const { idTipo, tipoNombre } = req.body;

        const tipo = await Tipos.findOne({idTipo: idTipo});
        if(!tipo) {
            return res.status(404).json({
                success: false,
                error: 'No se encontro tipo'
            });
        }
        await Tipos.updateOne({ idTipo: idTipo }, {
            "tipoNombre": tipoNombre
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

// @desc        delete tipo
// @route       DELETE /api/v1/alumnos/tipos/:id
// @access      public
exports.deleteTipo = async (req, res, next) => {
    try {
        const tipo = await Tipos.findById(req.params.id);
        if(!tipo) {
            return res.status(404).json({
                success: false,
                error: 'No se encontro tipo'
            });
        }
        await Tipos.remove({ _id: req.params.id });
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