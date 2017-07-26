const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;

/* connect to the test database */
process.env.MONGODB_URI = 'mongodb://localhost:27017/otters-test';
// run the actual connect to db
require('../lib/connect');

// get a reference to the global connection, because we need to drop
// the database prior to running our tests
const connection = require('mongoose').connection;

// require our app
const app = require('../lib/app');
// let chaiHttp start the server for us
const request = chai.request(app);

