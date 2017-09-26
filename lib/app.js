const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Customer = require('./models/customer');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/customers/:id', (req, res) => {
    Customer.findById(req.params.id)
        .lean()
        .then(customer => {
            customer ? res.send(customer) : res.status(404).send('Customer Not Found');
        })
        .catch(console.log);
});

app.get('/customers', (req, res) => {

    Customer.find()
        .lean()
        .select('__v _id address company createdAt name products tier updatedAt')
        .then(customers => res.send(customers))
        .catch(console.log);

});

app.post('/customers', (req, res) => {
    new Customer(req.body)
        .save()
        .then(customer => res.send(customer))
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
});

app.put('/customers/:id', (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(customer => res.send(customer))
        .catch(console.log);
});

app.delete('/customers/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id)
        .then(customer => res.send({ removed: (customer !== null ) }))
        .catch(console.log);
});

module.exports = app;