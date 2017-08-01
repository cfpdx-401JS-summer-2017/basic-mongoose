const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler');
const createAuth = require('./auth/ensure-auth');

app.use(morgan('dev'));

const ensureAuth = createAuth();

const auth = require('./routes/auth');
const beer = require('./routes/beers');
const me = require('./routes/me');

app.use('/api/auth', auth);
app.use('/api/me', ensureAuth, me);
app.use('/api/beers', ensureAuth, beer);

app.use(errorHandler());


module.exports = app;
