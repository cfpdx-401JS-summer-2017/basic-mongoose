const Router = require('express').Router;
const router = Router();
const Beer = require('../models/beer');
const bodyParser = require('body-parser');

router
    .use(bodyParser.json())

    .post('/', (req, res) => {
        new Beer(req.body)
            .save()
            .then(beer => res.send(beer))
            .catch(err => {
                console.log(err);
                res.status(500).send('something fucked up');
            });
    })

    .get('/:id', (req, res) => {
        Beer.findById(req.params.id)
            .lean()
            .then(beer => {
                if (!beer) {
                    res.status(404).send('Not Found');
                }
                else {
                    res.send(beer);
                }
            })
            .catch(console.log);
    })

    .get('/', (req, res) => {
        Beer.find()
            .lean()
            .select('name style')
            .then(beers => {
                res.send(beers);
            })
            .catch(console.log);
    })

    .delete('/:id', (req, res) => {
        Beer.remove()
            .where({ _id: req.params.id })
            .then(response => {
                res.send({ removed: response.result.n === 1 });
            })
            .catch(console.log);
    })

    .put('/:id', (req, res) => {
        Beer.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(beer => res.send(beer))
            .catch(console.log);
    });

module.exports = router;
