const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

// RUTAS
const alumnos = require('./routes/alumnos');
const cursos = require('./routes/cursos');
const examenes = require('./routes/examenes');
const login = require('./routes/login');
const preguntas = require('./routes/preguntas');
const tipos = require('./routes/tipos');
const respuestas = require('./routes/respuestas');

const app = express();

app.use(express.json());

app.use('/api/v1/alumnos', alumnos);
app.use('/api/v1/alumnos', cursos);
app.use('/api/v1/alumnos', examenes);
app.use('/api/v1/alumnos', login);
app.use('/api/v1/alumnos', preguntas);
app.use('/api/v1/alumnos', tipos);
app.use('/api/v1/alumnos', respuestas);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server running in ' + process.env.NODE_ENV + ' mode on port ' + PORT ));