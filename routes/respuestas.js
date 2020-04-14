const express = require('express');
const routerRespuestas = express.Router();
const { getRespuestas, addRespuesta } = require('../controllers/respuestas');

routerRespuestas.route('/respuestas')
    .post(getRespuestas);

routerRespuestas.route('/respuestas/add')
    .post(addRespuesta);

module.exports = routerRespuestas;