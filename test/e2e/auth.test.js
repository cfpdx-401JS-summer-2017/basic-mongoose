const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe('auth', () => {
    before(() => db.drop);

    const user = {
        email: 'you@me.com',
        password: 'hgv'
    };

    describe('user management', () => {

        const badRequest = (url, data, code, error) => 
            request
                .post(url)
                .send(data)
                .then(
                    () => {
                        throw new Error('status should not be okay');
                    },
                    res => {
                        assert.equal(res.status, code);
                        assert.equal(res.response.body.error, error);
                    }
                );

        it('signup requires email', () =>
            badRequest('/api/auth/signup', { password: 'billtv' }, 400, 'email and password must be supplied')
        );

        it('signup requires password', () =>
            badRequest('/api/auth/signup', { email: 'tv@hbo.com' }, 400, 'email and password must be supplied')
        );

        let token = '';

        it('signup', () =>
            request
                .post('/api/auth/signup')
                .send(user)
                .then(res => {
                    token = res.body.token;
                    assert.ok(token = res.body.token);
                })
                .catch(console.log)
        );

        it('cannot use the same email', () =>
            badRequest('/api/auth/signup', user, 400, 'email in use')
        );

        it('signin requires email', () =>
            badRequest('/api/auth/signin', { password: 'xyz' }, 400, 'email and password must be supplied')
        );

        it('signin requires password', () => 
            badRequest('/api/auth/signin', { email: 'you@me.com' }, 400, 'email and password must be supplied')
        );

        it('signin with wrong user', () => 
            badRequest('/api/auth/signin', { email: 'bad user', password: user.password }, 401, 'Invalid Login')
        );

        it('signin with the wrong password', () =>
            badRequest('/api/auth/signin', { email: user.email, password: 'bad' }, 401, 'Invalid Login')
        );

        
    }
    );
});