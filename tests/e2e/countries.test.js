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

    beforeEach(() => connection.dropDatabase());

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
            let france = {
                name: 'France',
                continent: 'Europe',
                language: 'French'
            };

            return save(france)
                .then(saved => {
                    france = saved;
                    assert.deepEqual(saved, france);
                });
        });
    
    });

    describe('GET', () => {
        
        it('gets all countries', () => {
            let newCountries = [
                {
                    name: 'India',
                    continent: 'Asia',
                    language: 'Hindi'
                },{
                    name: 'Scotland',
                    continent: 'Europe',
                    language: 'Scottish English'
                }];

            return Promise.all(newCountries.map(save))
                .then(saved => newCountries = saved)
                .then(() => request.get('/countries'))
                .then(res => {
                    const saved = res.body.sort((a, b) => a._id > b._id ? 1 : -1 );
                    assert.deepEqual(saved, newCountries);
                });
        });

        it('gets a country by id', () => {
            let country = {
                name: 'United States of America',
                continent: 'North America',
                language: 'English'
            };

            return save(country)
                .then(res => res.body = country)
                .then(country => request.get(`/countries/${country._id}`))
                .then(res => {
                    assert.deepEqual(res.body, country);
                });
        });
    });

    //TODO: describe('DELETE', () => {

    // });

    //TODO: describe('PUT', () => {

    // });

});