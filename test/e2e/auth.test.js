const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe.only('auth', () => {
    before(db.drop);

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
                    assert.ok(res.body.token);
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

        it('signin', () =>
            request
                .post('/api/auth/signin')
                .send(user)
                .then(res => assert.ok(res.body.token))
        );

        it('token is invalid', () =>
            request
                .get('/api/auth/verify')
                .set('Authorization', 'bad token')
                .then(
                    () => { throw new Error('success response not expected'); },
                    (res) => { assert.equal(res.status, 401); }
                )
        );

        it('token is valid', () => 
            request
                .get('/api/auth/verify')
                .set('Authorization', token)
                .then(res => assert.ok(res.body))
        );
    });

    describe('unauthorized', () => {

        it('401 with no token', () => {
            return request
                .get('/api/beers')
                .then(
                    () => { throw new Error('status should not be 200'); },
                    res => {
                        assert.equal(res.status, 401);
                        assert.equal(res.response.body.error, 'No Authorization Found');
                    }
                );
        });

        it('403 with invalid token', () => {
            return request
                .get('/api/beers')
                .set('Authorization', 'badtoken')
                .then(
                    () => { throw new Error('status should not be 200'); },
                    res => {
                        assert.equal(res.status, 401);
                        assert.equal(res.response.body.error, 'Authorization Failed');
                    }
                );
        });

    });
});