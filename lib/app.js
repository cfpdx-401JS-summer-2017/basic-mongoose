const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Tree = require('./models/tree');

app.use(bodyParser.json());

app.use(express.static('public'));

// POST a tree
app.post('/trees', (req, res) => {
    new Tree(req.body)
        .save()
        .then(tree => res.send(tree))
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });

});

// GET all for a count
app.get('/trees/count', (req, res) => {
    Tree.find()
        .count()
        .then(count => res.send({ count }))
        .catch(console.log);
});

// GET by id or 404 if not there
app.get('/trees/:id', (req, res) => {
    Tree.findById(req.params.id)
        .lean()
        .then(tree => {
            tree ? res.send(tree) : res.status(404).send('Not Found');
        })
        .catch(console.log);
});

// GET all
app.get('/trees', (req, res) => {
    Tree.find()
        .lean()
        .select('variety type locations ageEstimate __v')
        .then(trees => res.send(trees))
        .catch(console.log);
});

// DELETE a tree
app.delete('/trees/:id', (req, res) => {
    Tree.findByIdAndRemove(req.params.id)
        .then( result => res.send({ removed: (result !== null) }))
        .catch(console.log);
});

module.exports = app;