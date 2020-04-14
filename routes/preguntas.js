const express = require('express');
const routerPreguntas = express.Router();
const { getPreguntas, addPregunta, deletePregunta, updatePregunta } = require('../controllers/preguntas');

routerPreguntas.route('/preguntas/')
    .get(getPreguntas)
    .post(addPregunta);

routerPreguntas.route('/preguntas/updatePregunta')
    .post(updatePregunta);
     
routerPreguntas.route('/preguntas/:id')
    .delete(deletePregunta);

module.exports = routerPreguntas;