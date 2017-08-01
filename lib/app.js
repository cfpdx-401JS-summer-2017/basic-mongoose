const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');
const createAuth = require('./auth/ensure-auth');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const ensureAuth = createAuth();

const auth = require('./routes/auth');
const beer = require('./routes/beers');
const me = require('./routes/me');

app.use('/api/auth', auth);
app.use('/api/me', ensureAuth, me);
app.use('/api/beers', ensureAuth, beer);

app.use(errorHandler());


module.exports = app;
