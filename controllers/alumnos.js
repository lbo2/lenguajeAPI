const Alumnos = require('../models/Alumnos');

// @desc        get all alumnos
// @route       GET /api/v1/alumnos
// @access      public
exports.getAlumnos = async (req, res, next) => {
    try {
        const alumnos = await Alumnos.find();
        
        return res.status(200).json({
            success: true,
            count: alumnos.length,
            data: alumnos
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

// @desc        add alumno
// @route       POST /api/v1/alumnos
// @access      public
exports.addAlumno = async (req, res, next) => {
    console.log('addAlumno');
    try {
        const { rut, nombres, apellidos, password, curso, mail, type } = req.body;
        const existe = await Alumnos.findOne({ rut: rut });
        if(!existe){
            const alumno = await Alumnos.create(req.body);
            return res.status(201).json({
                success: true,
                data: alumno
            });
        } else {
            return res.status(400).json({
                success: false,
                error: 'Alumno ya existe'
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

// @desc        update alumno
// @route       POST /api/v1/alumnos/updateAlumno
// @access      public
exports.updateAlumno = async (req, res, next) => {
    console.log('updateAlumno');
    try {
        const { rut, nombres, apellidos, password, curso, mail, type } = req.body;

        const alumno = await Alumnos.findOne({rut: rut});
        if(!alumno) {
            return res.status(404).json({
                success: false,
                error: 'No se encontro alumno'
            });
        }
        await Alumnos.updateOne({ rut: rut }, {
            "nombres": (nombres ? nombres : alumno.nombres),
            "apellidos": (apellidos ? apellidos : alumno.apellidos),
            "password": (password ? password : alumno.password),
            "curso": (curso ? curso : alumno.curso),
            "mail": (mail ? mail : alumno.mail),
            "type": (type ? type : alumno.type)
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

// @desc        delete alumno
// @route       DELETE /api/v1/alumnos/:id
// @access      public
exports.deleteAlumno = async (req, res, next) => {
    try {
        const alumno = await Alumnos.findById(req.params.id);
        if(!alumno) {
            return res.status(404).json({
                success: false,
                error: 'No se encontro alumno'
            });
        }
        await Alumnos.remove({ _id: req.params.id });
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