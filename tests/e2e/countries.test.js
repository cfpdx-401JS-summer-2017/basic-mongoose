const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/countries-test';
require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('countries REST api', () => {

    before(() => connection.dropDatabase());

    // it('works', () => {
    //     assert.ok('did this work?');
    // });

    const france = {
        name: 'France',
        continent: 'Europe',
        language: 'French'
    };

    const india = {
        name: 'India',
        continent: 'Asia',
        language: 'Hindi'
    };

    const scotland = {
        name: 'Scotland',
        continent: 'Europe',
        language: 'Scottish English'
    };

    function save(country) {
        return request.post('/countries')
            .send(country)
            .then(({ body }) => {
                country._id = body._id;
                country.__v = body.__v;
                return body;
            });
    }
    
    describe('POST', () => {
        it('saves a country', () => {
            return save(france)
                .then(saved => {
                    assert.deepEqual(saved, france);
                });
        });
    });

});