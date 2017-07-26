const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URL = 'mongodb://localhost:27017/arboretum-test';
require('../../lib/connect');

const connection = require('mongoose').connection;
const app = require('../../lib/app');
const request = chai.request(app);

describe('trees REST API works', () => {

    before(() => connection.dropDatabase());

    const pine = {
        variety: 'pine',
        type: 'coniferous',
        location: [
            { current: 'Portland', past: [] }
        ]
    };

    const aspen = {
        variety: 'Aspen',
        type: 'deciduous',
        location: [
            { current: 'Portland', past: [{ previous: 'Eugene' }, { others: 'Bend' }]}
        ]
    };

    const maple = {
        variety: 'Maple',
        type: 'deciduous',
        location: [
            {
                current: 'Kyoto', 
                past: [{ previous: 'Yokohama' }]
            }
        ],
        age: [{
            min: 50,
            max: 75
        }]
    };

    function saveTree(tree) {
        return request.post('/trees')
            .send(tree)
            .then(({ body }) => {
                tree._id = body._id;
                tree.__v = body.__v;
                tree.age = body.age;
                tree.location[0]._id = body.location[0]._id;
                return tree;
            });
    }

    it('saves a tree', () => {
        return saveTree(pine)
            .then(recTree => {
                assert.ok(recTree._id);
                assert.deepEqual(recTree, pine);
            });
    });

    it('gets a tree when it exists', () => {
        return request
            .get(`/trees/${pine._id}`)
            .then(res => res.body)
            .then(tree => assert.deepEqual(tree, pine));
    });
    
    it('returns 404 error if tries to get nonexistent tree', () => {
        return request
            .get('/trees/345678901234123412341234')
            .then(() => {
                throw new Error('Got 200 code when should be 404');
            },
            res => {
                assert.equal(res.status, 404);
                assert.ok(res.response.error);
            });
    });

    it('gets all trees', () => {
        return Promise.all([
            saveTree(pine),
            saveTree(aspen),
            saveTree(maple)
        ])
            .then(() => request.get('/trees'))
            .then(res => {
                const trees = res.body;
                assert.deepEqual(trees, [pine, aspen, maple]);
            });
    });
});