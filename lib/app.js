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

app.get('/beers/:id', (req, res) => {
    Beer.findById(req.params.id)
        .lean()
        .then(beer => {
            if (!beer) {
                res.status(404).send('Not Found');
            }
            else {
                res.send(beer);
            }
        })
        .catch(console.log);
});

app.get('/beers', (req, res) => {
    Beer.find()
        .lean()
        .select('name style')
        .then(beers => {
            res.send(beers);
        })
        .catch(console.log);
});

app.delete('/beers/:id', (req, res) => {
    Beer.remove()
        .where({ _id: req.params.id })
        .then( response => {
            res.send({ removed: response.result.n === 1 });
        })
        .catch(console.log);
});

module.exports = app;
