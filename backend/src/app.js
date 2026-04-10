const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
const { httpLogger } = require('./logger');

const app = express();

app.use(httpLogger);

// middlewares antes de las rutas
app.use(express.json());
app.use(helmet());
app.use(cors());

// rutas
app.use(router);

app.get("/", (_req, res) => {
    return res.send("Welcome to Tours API!");
})

// middlewares después de las rutas
app.use(errorHandler)

module.exports = app;
