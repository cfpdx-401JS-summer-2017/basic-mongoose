const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Car = require('./models/car');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/cars/:id', (req, res) => {
    Car.findById(req.params.id)
        .lean()
        .then(car => {
            if (car) res.send(car);
            else res.status(404).send('Not Found');
        })
        .catch(console.log);
});

app.get('/cars', (req, res) => {
    Car.find()
        .lean()
        .select('brand color style')
        .then(cars => res.send(cars))
        .catch(console.log);
});

app.post('/cars', (req, res) => {
    new Car(req.body)
        .save()
        .then(car => res.send(car))
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

app.delete('/cars/:id', (req, res) => {
    Car.findByIdAndRemove(req.params.id)
        .then(() => res.send({ removed: true }))
        .catch(console.log);
});

app.put('/cars/:id', (req, res) => {
    Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(car => res.send(car))
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = app;