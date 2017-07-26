const Tree = require('../../lib/models/tree');
const { assert } = require('chai');

describe('Tree model', () => {
    it('validates with required fields', () => {
        const testTree = new Tree({
            variety: 'Aspen',
            type: 'deciduous',
            locations: ['Portland', 'Bend']
        });
        return testTree.validate();
    });

    it('fails validation when required fields are missing', () => {
        const testTree = new Tree();

        return testTree.validate()
            .then(() => {
                throw new Error('Expected validation error'); },
            ({ errors }) => {
                assert.ok(errors.variety);
                assert.ok(errors.type);
            });
    });

    it('type should be of enum type', () => {
        const testTree = new Tree({
            variety: 'Maple',
            type: 'fake',
            locations: ['Kyoto', 'Yokohama'],
            ageEstimate: {
                min: 50,
                max: 75
            }
        });

        return testTree.validate()
            .then(() => {
                throw new Error('Expected validation error');
            },
            ({ errors }) => assert.equal(errors.type.kind, 'enum')
            );
    });

    it('min should be of Number type', () => {
        const testTree = new Tree({
            variety: 'Maple',
            type: 'deciduous',
            locations: ['Kyoto', 'Yokohama'],
            ageEstimate: {
                min: 'fake',
                max: 75
            }
        });

        return testTree.validate()
            .then(() => {
                throw new Error('Expected validation error');
            },
            ({ errors }) => {
                assert.deepEqual(errors['ageEstimate.min'].message, 'Cast to Number failed for value "fake" at path "ageEstimate.min"');
            }
            );
    });
});