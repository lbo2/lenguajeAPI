const express = require('express');
const routerCursos = express.Router();
const { getCursos, addCurso, deleteCurso, updateCurso } = require('../controllers/cursos');

routerCursos.route('/cursos/')
    .get(getCursos)
    .post(addCurso);

routerCursos.route('/cursos/updateCurso')
    .post(updateCurso);
     
routerCursos.route('/cursos/:id')
    .delete(deleteCurso);
       
module.exports = routerCursos;