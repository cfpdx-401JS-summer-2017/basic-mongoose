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
                // res.status = 404;
                // res.response.body.error = 'no such beer found sucka';
                res.status(404).send('Not Found');
            }
            else {
                res.send(beer);

            }
        })
        .catch(console.log);
});


module.exports = app;
