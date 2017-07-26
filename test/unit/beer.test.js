const Beer = require('../../lib/models/beer');
const { assert } = require('chai');

describe('beer', () => {

    it('validates with required fields', () => {
        const beer = new Beer({
            name: 'Citra Ass Down',
            style: 'imperial ipa',
            stats: {
                abv: 8.2,
                ibu: 68,
                og: 17
            },
            grainBill: [
                {
                    name: 'Pale Malt'
                },
                {
                    name: 'Vienna Malt'
                },
                {
                    name: 'Munich Malt'
                },
                {
                    name: 'Wheat Malt'
                }
            ]
        });
        return beer.validate();
    });

    it('fails validation when required fields missing', () => {
        const beer = new Beer();
        return beer.validate()
            .then(() => { throw new Error('expected validation error'); },
            ({errors}) => {
                assert.ok(errors.name);
                assert.ok(errors.style);
            });
    });
    



});