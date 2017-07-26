const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Tree = require('./models/tree');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/trees/count', (req, res) => {
    Tree.find()
        .count()
        .then(count => res.send({ count }))
        .catch(console.log);
});

app.get('/trees/:id', (req, res) => {
    Tree.findById(req.params.id)
        .lean()
        .then(tree => res.send(tree))
        .catch(console.log);

});



module.exports = app;