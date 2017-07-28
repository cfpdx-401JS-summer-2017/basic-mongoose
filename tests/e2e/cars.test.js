const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/wheels-test;
require('../lib/connect');

const connection = require('mongoose').connection;

const app = require('../lib/app');
const request = chai.request(app);

describe('cars REST API', () => {
    before(() => connection.dropDatabase());

    const subaru = {
        name: 'subaru', 
        color: 'orange'
    };

    const lamborgini = {
        name: 'lamborgini', 
        color: 'orange'
    };

    const lexus = {
        name: 'lexus', 
        color: 'green'
    };

    function saveCar (car) {
        return request.post('/cars')
            .send(car)
            .then(({ body }) => {
                car._id = body._id;
                car._v = body._v
            });
    }
    it('saves a car', () => {
        return saveCar(subaru)
        .then(saveCar => {
            assert.isOk(saveCar._id);
            assert.deepEqual(saveCar, subary);
        });
    });
    it('GETs ')
    it('returns 404 if unicorn does not exist', () => {
       return request.get('/cars/')
       .then(() => {
           throw err
       })
   }) 
});