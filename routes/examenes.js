const express = require('express');
const routerExamenes = express.Router();
const { getExamenes, addExamen, deleteExamen, updateExamen } = require('../controllers/examenes');

routerExamenes.route('/examenes/')
    .get(getExamenes)
    .post(addExamen);

routerExamenes.route('/examenes/updateExamen')
    .post(updateExamen);
     
routerExamenes.route('/examenes/:id')
    .delete(deleteExamen);

module.exports = routerExamenes;