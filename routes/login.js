const express = require('express');
const routerLogin = express.Router();
const { login } = require('../controllers/login');

routerLogin.route('/login')
    .post(login);

module.exports = routerLogin;