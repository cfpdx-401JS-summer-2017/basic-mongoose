const connection = require('mongoose').connection;
const request = require('./request');

module.exports = {
    drop() {
        return connection.dropDatabase();
    },
    getToken(user = { email: 'me@me.com', password: 'xyz' }) {
        return request.post('/api/auth/signup')
            .send(user)
            .then(res => res.body.token);
    }
};