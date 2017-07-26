const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Car = require('./models/cars');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/cars', (req, res) => {
    Car.find()
    .lean()
    .then(car => res.send(car)
    .catch(console.log));
});
app.post('/cars', (rep, res) => {
new Car(req.body)
    .save()
    .then(err => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    });
});