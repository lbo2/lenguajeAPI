const express = require('express');
const router = express.Router();
const { getAlumnos, addAlumno, deleteAlumno, updateAlumno } = require('../controllers/alumnos');
const { getCursos, addCurso, deleteCurso, updateCurso } = require('../controllers/cursos');
const { getTipos, addTipo, deleteTipo, updateTipo } = require('../controllers/tipos');
const { getExamenes, addExamen, deleteExamen, updateExamen } = require('../controllers/examenes');
const { getPreguntas, addPregunta, deletePregunta, updatePregunta } = require('../controllers/preguntas');
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

router.route('/tipos/')
    .get(getTipos)
    .post(addTipo);

router.route('/tipos/updateTipo')
    .post(updateTipo);
        
router.route('/tipos/:id')
    .delete(deleteTipo);

router.route('/examenes/')
    .get(getExamenes)
    .post(addExamen);

router.route('/examenes/updateExamen')
    .post(updateExamen);
     
router.route('/examenes/:id')
    .delete(deleteExamen);

router.route('/preguntas/')
    .get(getPreguntas)
    .post(addPregunta);

router.route('/preguntas/updatePregunta')
    .post(updatePregunta);
     
router.route('/preguntas/:id')
    .delete(deletePregunta);
     
router.route('/:id')
    .delete(deleteAlumno);
       

module.exports = router;