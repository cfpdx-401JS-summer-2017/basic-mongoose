const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Tree = require('./models/tree');

app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/trees', (req, res) => {
    new Tree(req.body)
        .save()
        .then(tree => res.send(tree))
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });

});

app.get('/trees/count', (req, res) => {
    Tree.find()
        .count()
        .then(count => res.send({ count }))
        .catch(console.log);
});

app.get('/trees/:id', (req, res) => {
    Tree.findById(req.params.id)
        .lean()
        .then(tree => {
            tree ? res.send(tree) : res.status(404).send('Not Found');
        })
        .catch(console.log);
});

app.get('/trees', (req, res) => {
    Tree.find()
        .lean()
        .select('variety type locations ageEstimate __v')
        .then(trees => res.send(trees))
        .catch(console.log);
});


module.exports = app;