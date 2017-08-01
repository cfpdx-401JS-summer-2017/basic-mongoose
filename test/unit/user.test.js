const assert = require('chai').assert;
const User = require('../../lib/models/user');

describe('user model', () => {

    it('new user generates hash', () => {
        const user = new User({
            email: 'me@me.com'
        });
        const password = 'xyz';
        user.generateHash(password);

        assert.notEqual(user.hash, password);

        assert.isOk(user.comparePassword('xyz'));
        assert.isNotOk(user.comparePassword('abc'));
    });
});