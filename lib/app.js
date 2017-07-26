const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Country = require('./models/country');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/countries', (req, res) => {
    new Country(req.body)
        .save()
        .then(country => res.send(country))
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = app;
