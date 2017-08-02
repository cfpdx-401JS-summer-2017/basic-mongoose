const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe('beers REST api', () => {
    before(() => db.drop);

    const stormy = {
        name: 'Dark and Stormy Night',
        style: 'stout',
        stats: {
            abv: 5.8,
            ibu: 54,
            og: 15
        },
        grainBill: [
            { name: 'Pale Malt' }, { name: 'Roasted Barley' },
            { name: 'Munich Malt' }, { name: 'Chocolate' }
        ]
    };

    const pilz = {
        name: 'fuckin hate this',
        style: 'pilsner',
        stats: {
            abv: 4.2,
            ibu: 7,
            og: 12
        },
        grainBill: [
            { name: 'Pilsner Malt' }, { name: 'Munich Malt' },
            { name: 'Crystal 20' }
        ]
    };

    const soPale = {
        name: 'pale like twilight',
        style: 'pale ale',
        stats: {
            abv: 5,
            ibu: 38,
            og: 14
        },
        grainBill: [
            { name: 'Pale Malt' }, { name: 'Munich Malt' },
            { name: 'Crystal 80' }, { name: 'Vienna Malt' }
        ]
    };

    function saveBeer(beer) {
        return request.post('/api/beers')
            .send(beer)
            .then(({ body }) => {
                beer._id = body._id;
                beer.__v = body.__v;
                body.grainBill.forEach((grain, i) => {
                    beer.grainBill[i]._id = body.grainBill[i]._id;
                });
                return body;
            });
    }

    it('saves a beer', () => {
        return saveBeer(stormy)
            .then(savedBeer => {
                assert.isOk(savedBeer._id);
                assert.deepEqual(savedBeer, stormy);
            });
    });

    it('gets beer if exists', () => {
        return request
            .get(`/api/beers/${stormy._id}`)
            .then(res => res.body)
            .then(beer => assert.deepEqual(beer, stormy));
    });

    it('returns 404 if beer doesnt exist', () => {
        return request
            .get('/api/beers/746353546575775588555564')
            .then(() => {
                throw new Error('successful status code not expected');
            },
            res => {
                assert.equal(res.status, 404);
                assert.equal(res.message, 'Not Found');
            });
    });

    it('returns a list of beers from database', () => {
        return Promise.all([
            saveBeer(soPale),
            saveBeer(pilz)
        ])
            .then(() => {
                return request.get('/api/beers');
            })
            .then(res => {
                let beers = res.body;
                assert.equal(beers.length, 3);
                assert.equal(beers[0].name, stormy.name);
            });
    });

    it('deletes a beer from the db', () => {
        return request.delete(`/api/beers/${soPale._id}`)
            .then(res => {
                const message = JSON.parse(res.text);
                assert.deepEqual(message, { removed: true });
            });
    });

    it('screams when you try to delete a beer without a valid id', () => {
        return request.delete('/api/beers/746353546575775588555564')
            .then( res => {
                const message = JSON.parse(res.text);
                assert.deepEqual(message, { removed: false });
            });
    });

    it('updates an existing beer', () => {
        return request.put(`/api/beers/${pilz._id}`)
            .send({ name: 'fucken luv dis' })
            .then( () => {
                return request.get(`/api/beers/${pilz._id}`);
            })
            .then(res => {
                const updatedBeer = res.body;
                assert.equal(updatedBeer.name, 'fucken luv dis');
            });
    });
});


