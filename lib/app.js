const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Beer = require('./models/beer');

app.use(bodyParser.json());

app.post('/beers', (req, res) => {
    new Beer(req.body)
        .save()
        .then(beer => res.send(beer))
        .catch(err => {
            console.log(err);
            res.status(500).send('something fucked up');
        });
});

module.exports = app;
