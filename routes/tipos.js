const express = require('express');
const routerTipos = express.Router();
const { getTipos, addTipo, deleteTipo, updateTipo } = require('../controllers/tipos');

routerTipos.route('/tipos/')
    .get(getTipos)
    .post(addTipo);

routerTipos.route('/tipos/updateTipo')
    .post(updateTipo);
        
routerTipos.route('/tipos/:id')
    .delete(deleteTipo);

module.exports = routerTipos;