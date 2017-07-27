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

app.get('/countries', (req, res) => {
    Country.find()
        .lean()
        // .select()
        .then(countries => res.send(countries))
        .catch(console.log);
});

app.get('/countries/:id', (req, res) => {
    Country.findById(req.params.id)
        .lean()
        // .select()
        .then(country => res.send(country))
        .catch(console.log);
});

app.delete('/countries/:id', (req, res) => {
    Country.findByIdAndRemove(req.params.id)
        .then(country => (country === null) ? res.send({ removed: false }) : res.send({ removed: true }))
        .catch({ removed: false });
});

app.put('/countries/:id', (req, res) => {
    Country.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .lean()
        .then(country => res.send(country))
        .catch(console.log);
});

module.exports = app;
