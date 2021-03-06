const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const client = require('./client');

const app = express();

app.use(morgan('dev'));
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(cors());
app.use(express.json());

app.get('/', client);

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
