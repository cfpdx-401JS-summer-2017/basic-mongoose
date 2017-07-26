const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
/* connect to the test database */
process.env.MONGODB_URI = 'mongodb://localhost:27017/mythicals-test';
// run the actual connect to db
require('../../lib/connect');

// get a reference to the global connection,
// because we need to drop the database prior to
// running our tests
const connection = require('mongoose').connection;
const app = require('../../lib/app');
const request = chai.request(app);

describe('dragons REST api', ()=> {
    //start with a clean slate, empty db
    before(()=> connection.dropDatabase());

    const smaug = {
        name: 'Smaug',
        color: 'red'
    };
    
    const scatha = {
        name: 'Scatha',
        color: 'white'

    };
    const glaurung = {
        name: 'Glaurung',
        color: 'black'
    };
    function saveDragon(dragon) {
        return request.post('/dragon')
            .send(dragon)
            .then(({body})=>{
                dragon._id = body._id;
                dragon.__v = body.__v;
                return body;
            });
    }
    it('saves a dragon', ()=>{
        return saveDragon(smaug)
            .then(storedDragon => {
                assert.isOk(storedDragon._id);
                assert.deepEqual(storedDragon, smaug);
            });
    });
});