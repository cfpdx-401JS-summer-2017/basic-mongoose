const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;

/* connect to the test database */
process.env.MONGODB_URI = 'mongodb://localhost:27017/otters-test';
// run the actual connect to db
require('../../lib/connect');

// get a reference to the global connection, because we need to drop
// the database prior to running our tests
const connection = require('mongoose').connection;

// require our app
const app = require('../../lib/app');
// let chaiHttp start the server for us
const request = chai.request(app);

describe('otter REST api', () => {

    // start with a clean slate, empty db
    // for mongoose, use special dropDatabase directly on connection
    before(() => connection.dropDatabase());

    const benjamin = {
        name: 'Benjamin',
        type: 'river',
        color: 'red',
        food: [
            { name: 'whipped cream', lbs: 1 }
        ]
    };

    const juju = {
        name: 'Juju',
        type: 'angry',
        color: 'eggshell',
        food: [
            { name: 'calamari olives', lbs: 19 },
            { name: 'nickels', lbs: 8}
        ]
    };

    const sonja = {
        name: 'Sonja',
        type: 'sea',
        color: 'technicolor',
        food: [
            { name: 'cigarettes', lbs: 12 },
            { name: 'otter pops', lbs: 250 },
            { name: 'krill', lbs: 0.3}
        ]
    };

    function saveOtter(otter) {
        return request.post('/otters')
            .send(otter)
            .then(({ body }) => {
                otter._id = body._id;
                otter.__v = body.__v;
                return body;
            });
    }

    it('saves an otter', () => {
        return saveOtter(benjamin)
            .then(savedOtter => {
                assert.isOk(savedOtter._id);
                assert.equal(savedOtter.name, benjamin.name);
                assert.equal(savedOtter.type, benjamin.type);
            });
    });

    it('GETs otter if it exists', () => {
        return request
            .get(`/otters/${benjamin._id}`)
            .then(res => res.body)
            .then(otter => {
                assert.equal(otter.name, benjamin.name);
                assert.equal(otter.type, benjamin.type);
            });
    });

    it('returns 404 if otter does not exist', () => {
        return request.get('/otters/58ff9f496aafd447111c29b5').then(
            () => {
                throw new Error('Unexpected Success In Error Test');
            },
            res => {
                assert.equal(res.status, 404);
                assert.equal(res.message, 'Not Found');
            }
        );
    });

    it('GET all otters', () => {
        return Promise.all([
            saveOtter(juju),
            saveOtter(sonja),
        ])
            .then(() => request.get('/otters'))
            .then(res => {
                const otters = res.body;
                assert.equal(otters[2].name, sonja.name);
                assert.equal(otters[1].type, juju.type);
                assert.equal(otters[0].color, benjamin.color);
            });
    });

    it('Replaces otter content', () => {
        const rebecca = { name: 'Rebecca', type: 'space'};
        return request
            .put(`/otters/${benjamin._id}`)
            .send(rebecca)
            .then(res => res.body)
            .then(otter => {
                assert.equal(otter.name, rebecca.name);
                assert.equal(otter.type, rebecca.type);
            });
    });

    
});