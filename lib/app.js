const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Customer = require('./models/customer');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/customers', (req, res0) => {

    Customer.find([])
        .lean()
        .select('name company')
        .then(customers => res.send(customers))
        .catch(console.log);

});

module.exports = app;