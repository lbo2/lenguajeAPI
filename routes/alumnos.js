const express = require('express');
const routerAlumnos = express.Router();
const { getAlumnos, addAlumno, deleteAlumno, updateAlumno } = require('../controllers/alumnos');

routerAlumnos.route('/')
    .get(getAlumnos)
    .post(addAlumno);

routerAlumnos.route('/updateAlumno')
    .post(updateAlumno);
     
routerAlumnos.route('/:id')
    .delete(deleteAlumno);
       

module.exports = routerAlumnos;