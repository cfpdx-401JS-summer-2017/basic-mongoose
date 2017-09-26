const Customer = require('../../lib/models/customer');
const { assert } = require('chai');

describe('Customer model', () => {
    it('validates gold path with required fields', () => {
        const customer = new Customer({
            name: 'Sally Hampton',
            company: 'ABC Company',
            tier: { 
                name: 'Bronze' 
            }
            
        });
        return customer.validate();
    });

    it('fails validation when missing required fields', () => {
        const customer = new Customer({});
        return customer.validate()
            .then(
                () => { throw new Error('Expected validation error'); },
                ({ errors }) => {
                    assert.ok(errors.name);
                    assert.ok(errors.company);
                }
            );
    });
});