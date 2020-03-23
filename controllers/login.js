const Alumnos = require('../models/Alumnos');

// @desc        login
// @route       POST /api/v1/alumnos/login
// @access      public
exports.login = async (req, res, next) => {
    console.log('login');
    try {
        const { rut, password } = req.body;
        const alumno = await Alumnos.findOne({ rut: rut, password: password });
        console.log('alumno findOne', alumno);
        if(!alumno) {
            return res.status(404).json({
                success: false,
                error: 'No se encontro alumno'
            });
        } else {
            return res.status(200).json({
                success: true,
                data: alumno
            });
        }
    } catch (err) {
        console.log(err);
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