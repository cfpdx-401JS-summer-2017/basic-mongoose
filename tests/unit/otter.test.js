const Otter = require('../../lib/models/otter');
const { assert } = require('chai');

describe('Otter model', () => {
    it('validates with required fields', () => {
        const otter = new Otter({
            name: 'Gerald',
            type: 'space',
            color: 'magenta',
            food: [
                { name: 'pizza', lbs: 16 },
                { name: 'fish', lbs: 5 }
            ]
        });
        return otter.validate();
    });

    it('fails validation when required fields are missing', () => {
        const otter = new Otter();
        return otter.validate()
            .then(
                () => { throw new Error( 'expected validation error ');},
                ({ errors }) => {
                    assert.ok(errors.name);
                    assert.ok(errors.type);
                }
            );
    });

    it('type should be of enum type', () => {
        const otter = new Otter({
            name: 'Sheila',
            type: 'dune'
        });
        return otter.validate()
            .then(
                () => { throw new Error( 'expected validation error ');},
                ({ errors }) => {
                    assert.equal(errors.type.kind, 'enum');
                }
            );
    });
});