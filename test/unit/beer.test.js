const Beer = require('../../lib/models/beer');
const { assert } = require('chai');

describe('beer', () => {

    it('validates with required fields', () => {
        const beer = new Beer({
            name: 'Citra Ass Down',
            style: 'Imperial IPA',
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
            ],
            hopSchedule: [
                {
                    name: 'Citra',
                    alpha: 12,
                    type: 'whole',
                    use: {
                        designation: 'boil',
                        time: 60,
                        timeUnit: 'min'
                    }
                },
                {
                    name: 'Columbus',
                    type: 'whole',
                    use: {
                        designation: 'boil',
                        time: 60,
                        timeUnit: 'min'
                    }
                },
                {
                    name: 'Centennial',
                    alpha: 16,
                    type: 'pellets',
                    use: {
                        designation: 'Aroma',
                        time: 10,
                        timeUnit: 'min'
                    }
                }
            ]
        });
        
    });


});