const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Otter = require('./models/otter');

app.use(bodyParser.json());

// app.use(express.static('public'));

app.get('/otters/count', (req, res) => {
    //use Model method(don't have an instance yet)
    // with findOne or findById to get a single object
    Otter.find()
        .count()
        .then(count => res.send({count}))
        .catch(console.log);
});

app.get('/otters/:id', (req, res) => {
    // same comment as above
    Otter.findById(req.params.id)
        .lean()
        .then(otter => res.send(otter))
        .catch(console.log);
});

app.get('/otters', (req, res) => {
    //use the model method to query and get list of otters
    Otter.find()
        .lean()
        .select('name type')
        .then(otters => res.send(otters))
        .catch(console.log);
});

app.post('/otters', (req, res) => {
    //create a new otter by using the model as a class(or constructor function)
    // we can pass in req.body as "initial data"
    // same as:
    // const otter = new Otter(req.body)
    // otter.save().then(...)
    new Otter(req.body)
        .save()
        .then(otter => res.send(otter))
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

app.delete('/otters/:id', (req, res) => {
    Otter.findByIdAndRemove(req.params.id)
        .then(otter => res.send(otter))
        .catch(console.log);
});

app.put('/otters/:id', (req, res) => {
    Otter.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(otter => res.send(otter))
        .catch(console.log);
});

app.patch('/otters/:id', (req, res) => {
    Otter.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true,
        runValidators: true
    })
        .then(otter => res.send(otter))
        .catch(console.log);
});

module.exports = app;