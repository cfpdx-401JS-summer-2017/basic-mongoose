const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Otter = require('./models/unicorn');

app.use(bodyParser.json());