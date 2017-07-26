const Tree = require('../../lib/models/tree');
const { assert } = require('chai');

describe('Tree model', () => {
    it('validates with required fields', () => {
        const testTree = new Tree({
            variety: 'Aspen',
            type: 'deciduous',
            location: [
                { current: 'Portland', past: [{ previous: 'Eugene' }, { others: 'Bend' }] },
            ]
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
            }
            );
    });

    it('type should be of enum type', () => {
        const testTree = new Tree({
            variety: 'pine',
            type: 'wrongType',
            location: [
                { current: 'Portland', past: [{ previous: 'Eugene' }, { others: 'Bend' }] },
            ]
        });

        return testTree.validate()
            .then(() => {
                throw new Error('Expected validation error');
            },
            ({ errors }) => {
                assert.equal(errors.type.kind, 'enum');
            });
    });
});

// add tests for location - current required
// add test for age