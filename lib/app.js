const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Otter = require('./models/otter');

app.use(bodyParser.json());


app.get('/otters/count', (req, res) => {
    
    Otter.find()
        .count()
        .then(count => res.send({count}))
        .catch(console.log);//eslint-disable-line
});

app.get('/otters/:id', (req, res) => {
    Otter.findById(req.params.id)
        .lean()
        .then(otter => {
            if(otter) {
                res.send(otter);
            } else {
                res.status(404).send('Not Found');
            }
        })
        .catch(err => {
            console.log(err);//eslint-disable-line
            res.status(500).send('Unexpected Error');
        });
});

app.get('/otters', (req, res) => {
    Otter.find()
        .lean()
        .select('name type color food')
        .then(otters => res.send(otters))
        .catch(console.log);//eslint-disable-line
});

app.post('/otters', (req, res) => {
   
    new Otter(req.body)
        .save()
        .then(otter => res.send(otter))
        .catch(err => {
            console.log(err);//eslint-disable-line
            res.status(500).send('Internal Server Error');
        });
});

app.delete('/otters/:id', (req, res) => {
    Otter.findByIdAndRemove(req.params.id)
        .then(() => res.send({removed: true}))
        .catch(console.log);//eslint-disable-line
});

app.put('/otters/:id', (req, res) => {
    Otter.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(otter => res.send(otter))
        .catch(console.log);//eslint-disable-line
});

app.patch('/otters/:id', (req, res) => {
    Otter.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true,
        runValidators: true
    })
        .then(otter => res.send(otter))
        .catch(console.log);//eslint-disable-line
});

module.exports = app;