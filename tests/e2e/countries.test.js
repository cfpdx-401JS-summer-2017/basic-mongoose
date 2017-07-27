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
                country.cities = body.cities;
                return body;
            });
    }
    
    describe('POST', () => {
    
        it('saves a country', () => {
            let france = {
                name: 'France',
                continent: 'Europe',
                language: 'French',
                cities: [
                    { name: 'Paris', visited: false },
                    { name: 'Lyon', visited: true },
                    { name: 'Bordeaux', visited: false }]
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
                    language: 'Hindi',
                    cities: [
                        { name: 'Mumba', visited: false },
                        { name: 'Delhi', visited: true }]
                },{
                    name: 'Scotland',
                    continent: 'Europe',
                    language: 'Scottish English',
                    cities: [{ name: 'Glasgow', visited: false }]
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
                language: 'English',
                cities: [
                    { name: 'Portland', visited: true },
                    { name: 'Seattle', visited: true }]
            };

            return save(country)
                .then(res => res.body = country)
                .then(country => request.get(`/countries/${country._id}`))
                .then(res => {
                    assert.deepEqual(res.body, country);
                });
        });
    });

    describe('DELETE', () => {

        it('deletes a country by id', () => {
            let country = {
                name: 'Canada',
                continent: 'North America',
                language: 'English'
            };

            return save(country)
                .then(res => res.body = country)
                .then(country => request.delete(`/countries/${country._id}`))
                .then(res => {
                    assert.deepEqual(res.body, { removed: true });
                });
        });

        it('deletes a country by id and returns false', () => {
            return request.delete('/countries/bad8fee7896ca0056933b0b9')
                .then(res => {
                    assert.deepEqual(res.body, { removed: false });
                });
        });

    });

    describe('PUT', () => {

        it('updates a country', () => {
            let country = {
                name: 'Brazil',
                continent: 'North America',
                language: 'Portuguese'
            };

            let update = { continent: 'South America' };

            return save(country)
                .then(res => res.body = country)
                .then(country => request.put(`/countries/${country._id}`).send(update))
                .then(res => {
                    assert.deepEqual(res.body.continent, update.continent);
                });
        });

    });

});