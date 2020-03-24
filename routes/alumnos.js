const express = require('express');
const router = express.Router();
const { getAlumnos, addAlumno, deleteAlumno, updateAlumno } = require('../controllers/alumnos');
const { getCursos, addCurso, deleteCurso, updateCurso } = require('../controllers/cursos');
const { getExamenes, addExamen, deleteExamen, updateExamen } = require('../controllers/examenes');
const { login } = require('../controllers/login');

router.route('/')
    .get(getAlumnos)
    .post(addAlumno);

router.route('/updateAlumno')
    .post(updateAlumno);

router.route('/login')
    .post(login);

router.route('/cursos/')
    .get(getCursos)
    .post(addCurso);

router.route('/cursos/updateCurso')
    .post(updateCurso);
     
router.route('/cursos/:id')
    .delete(deleteCurso);

router.route('/examenes/')
    .get(getExamenes)
    .post(addExamen);

router.route('/examenes/updateExamen')
    .post(updateExamen);
     
router.route('/examenes/:id')
    .delete(deleteExamen);
     
router.route('/:id')
    .delete(deleteAlumno);
       

module.exports = router;