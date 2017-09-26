const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/customers-test';
require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('customers REST api', () => {
    before(() => connection.dropDatabase());

    const customer1 = {
        name: 'John Smith',
        company: 'ABC Company',
        address: {
            street: '232 Oak Street',
            city: 'Portland',
            state: 'Oregon',
            zip: '97209'
        },
        products: 'workflow',
        tier: {
            name: 'Gold',
            level: 2,
            status: 'Active'
        }
    };

    const customer2 = {
        name: 'Amy Nelson',
        company: 'XYZ Company',
        address: {
            street: '111 Maple Street',
            city: 'Portland',
            state: 'Oregon',
            zip: '97209'
        },
        products: 'support',
        tier: {
            name: 'Silver',
            level: 1,
            status: 'Active'
        }
    };

    const customer3 = {
        name: 'Mary Swanson',
        company: 'Swanson Consulting, Inc.',
        address: {
            street: '444 Alder Street',
            city: 'Portland',
            state: 'Oregon',
            zip: '97209'
        },
        products: 'portal',
        tier: {
            name: 'Gold',
            level: 3,
            status: 'Active'
        }
    };

    function saveCustomer(customer) {
        return request.post('/customers')
            .send(customer)
            .then(({ body }) => {
                customer._id = body._id;
                customer.__v = body.__v;
                customer.createdAt = body.createdAt;
                customer.updatedAt = body.updatedAt;

                return body;
            });
    }

    it('saves a customer', () => {
        return saveCustomer(customer1)
            .then(savedCustomer => {
                assert.isOk(savedCustomer._id);
                assert.deepEqual(savedCustomer, customer1);
            });
    });

    it('GETs customer if it exists', () => {
        return request.get(`/customers/${customer1._id}`)
            .then(res => res.body)
            .then(customer => assert.deepEqual(customer, customer1));
    });

    it('returns 404 if customer does not exist', () => {
        const nonId = '59c9bd96b9d45d482659b531';
        return request.get(`/customers/${nonId}`)
            .then(
                () => { throw new Error('successful status code not expected');
                },
                res => {
                    assert.equal(res.status, 404);
                    assert.isOk(res.response.error);
                }
            );
    });

    it('GET all customers', () => {
        return Promise.all([
            saveCustomer(customer2),
            saveCustomer(customer3),
        ])
            .then(() => request.get('/customers'))
            .then(res => {
                const customers = res.body;
                assert.deepEqual(customers, [customer1, customer2, customer3]);
            });
    });

    it('Updates existing customer', () => {
        return request
            .put(`/customers/${customer1._id}`)
            .send({ name: 'Jon Smith' })
            .then(res => {
                const updatedCustomer = res.body;
                assert.equal(updatedCustomer.name, 'Jon Smith');
            });
    });

    it('Removes customer by id', () => {
        return request.delete(`/customers/${customer1._id}`)
            .then(res => assert.deepEqual(res.body, { removed: true }));
    });
});