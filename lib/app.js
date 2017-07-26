const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Dragon = require('./models/dragon');

app.use(bodyParser.json());

app.use(express.static('public'));


app.get('/dragons/count', (req, res) => {
    // use the Model method (we don't have a instance yet!)
    // with findOne or findById to get a single object
    Dragon.find()
        .count()
        .then(count => res.send({ count }))
        .catch(console.log);
});

app.get('/dragons/:id', (req, res) => {
    // use the Model method (we don't have a instance yet!)
    // with findOne or findById to get a single object
    Dragon.findById(req.params.id)
        .lean()
        .then(dragon => res.send(dragon))
        .catch(console.log);
});

app.get('/dragons', (req, res) => {
    // use the Model method to "query" and
    // get list of dragons
    Dragon.find()
        .lean()
        .select('name color')
        .then(dragons => res.send(dragons))
        .catch(console.log);
});

app.post('/dragons', (req, res) => {
    // Create a "new" dragon by using the Model
    // as a class (or constructor function).
    // we can pass in req.body as "initial data".
    // same as:
    // const dragon = new Dragon(req.body);
    // Dragon.save().then(...)
    new Dragon(req.body)
        .save()
        .then(dragon => res.send(dragon))
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

app.delete('/dragons/:id', (req, res) => {
    Dragon.findByIdAndRemove(req.params.id)
        .then(dragon => res.send(dragon))
        .catch(console.log);
});

app.put('/dragons/:id', (req, res) => {
    Dragon.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(dragon => res.send(dragon))
        .catch(console.log);
});

app.patch('/dragons/:id', (req, res) => {
    Dragon.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { 
        new: true, 
        runValidators: true 
    })
        .then(dragon => res.send(dragon))
        .catch(console.log);
});

module.exports = app;