const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/beers-test';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');

const request = chai.request(app);

describe('beers REST api', () => {
    before(() => {
        connection.dropDatabase();
    });

    const stormy = {
        name: 'Dark and Stormy Night',
        style: 'stout',
        stats: {
            abv: 5.8,
            ibu: 54,
            og: 15
        },
        grainBill: [
            { name: 'Pale Malt'}, {name: 'Roasted Barley'}, 
            {name: 'Munich Malt'}, {name: 'Chocolate'}
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
            { name: 'Pilsner Malt'}, {name: 'Munich Malt'}, 
            {name: 'Crystal 20'}
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
            { name: 'Pale Malt'}, {name: 'Munich Malt'}, 
            {name: 'Crystal 80'}, {name: 'Vienna Malt'}
        ]
    };

    function saveBeer(beer) {
        return request.post('/beers')
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
});

