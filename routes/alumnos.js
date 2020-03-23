const express = require('express');
const router = express.Router();
const { getAlumnos, addAlumno, deleteAlumno, updateAlumno } = require('../controllers/alumnos');
const { login } = require('../controllers/login');

router.route('/')
    .get(getAlumnos)
    .post(addAlumno);

router.route('/login')
    .post(login);

router.route('/updateAlumno')
    .post(updateAlumno);
     
router.route('/:id')
    .delete(deleteAlumno);

       

module.exports = router;