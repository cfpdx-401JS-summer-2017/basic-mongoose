const chai = require('chai');
const assert = chai.assert;
const Country = require('../../lib/models/country');

describe('Country model', () => {
    
    it('validates with required fields', () => {
        const country = new Country({
            name: 'U.S.A',
            continent: 'North America'
        });

        return country.validate();

    });

    it('fails validation when fields are missing', () => {
        const country = new Country();

        return country.validate()
            .then(
                () => { throw new Error('Expected validation error but did not get any'); },
                ({ errors }) => {
                    assert.ok(errors.name);
                    assert.ok(errors.continent);
                }
            );
    });

    it('validates continent should be one of the enum types', () => {
        const country = new Country({
            name: 'China',
            continent: 'Endor'
        });

        return country.validate()
            .then(
                () => { throw new Error('Expected validation error but did not get any'); },
                ({ errors }) => {
                    assert.equal(errors.continent.kind, 'enum');
                }
            );

    });

});