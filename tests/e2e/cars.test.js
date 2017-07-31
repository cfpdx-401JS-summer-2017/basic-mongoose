const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/wheels-test';
require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('cars REST API', () => {
    before(() => connection.dropDatabase());

    const subaru = {
        brand: 'subaru',
        color: 'green'
    };

    const lamborgini = {
        brand: 'lamborgini',
        color: 'orange'
    };

    const lexus = {
        brand: 'lexus',
        color: 'silver'
    };

    function saveCar(car) {
        return request
            .post('/cars')
            .send(car)
            .then(({ body }) => {
                car._id = body._id;
                car._v = body._v;
                return body;
            });
    }

    it.only('saves a car', () => {
        return saveCar(subaru)
            .then(savedCar => {
                assert.isOk(savedCar._id);
                assert.equal(savedCar.brand, subaru.brand);
                assert.equal(savedCar.color, subaru.color);
            });
    });

    it.only('GETs car if it exists', () => {
        return request
            .get(`/cars/${subaru._id}`)
            .then(res => res.body)
            .then(car => {
                assert.equal(car.brand, subaru.brand);
                assert.equal(car.color, subaru.color);
            });
    });

    it.only('returns 404 if a car does not exist', () => {
        return request
            .get('/cars/59ff9f496aafd447111c29b1')
            .then(() => {
                throw new Error('Success of status code not expected');
            },
            res => {
                assert.equal(res.status, 404);
                assert.equal(res.message, 'Not Found');
            });
    });

    it.only('replaces a car with another', () => {
        const bugatti = {
        brand: 'bugatti',
        color: 'orange'
    };
            return request
            .put(`/cars/${subaru._id}`)
            .send(bugatti)
            .then(res => res.body)
            .then(car => {
                assert.equal(car.brand, bugatti.brand);
                assert.equal(car.color, bugatti.color);
            });
    });

    it.only('deletes a car by the id', () => {
        return request
            .delete(`/cars/${subaru._id}`)
            .then(res => {
                assert.deepEqual(JSON.parse(res.text), {removed: true});
            });
    });
});