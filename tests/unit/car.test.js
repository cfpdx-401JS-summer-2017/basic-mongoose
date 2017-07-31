const Car = require('../../lib/models/car');
const { assert } = require('chai');

describe('Car model', () => {
    it('validates with required fields', () => {
        const car = new Car({
            brand: 'subaru',
            color: 'green',
            style: 'coupe'
        });
    return car.validate();
    });
});