const chai = require('chai');
const assert = chai.assert;
const connect = require('../../lib/helpers/connect');
const connection = require('mongoose').connection;
const req = require('../../lib/helpers/request');
const db = require('../../lib/helpers/db');
const seedPeople = require('../testdata/seedPeople');

describe('e2e person tests', () => {
  before(() => {
    connect();
    db.drop();
  });

  it('POST /people', async () => {
    for (let i = 0; i < seedPeople.length; i++) {
      await req
        .post('/people')
        .send(seedPeople[i])
        .then(user => {
          assert.hasAnyKeys(user.body, ['code', '_id']);
        })
        .catch();
    }
  });
  it('GET /people', async () => {
    const foundPeople = await req.get('/people');
    assert.lengthOf(foundPeople.body, 2);
  }),
    it('GET /people/:id', async () => {
      const getOne = await req.get('/people');
      const id = getOne.body[0]._id;
      const getOneById = await req.get(`/people/${id}`);
      assert(getOne.body[0].name, getOneById.body.name);
    }),
    it('PUT /people/:id', async () => {
      const getOne = await req.get('/people');
      const id = getOne.body[0]._id;
      const updatedUser = await req
        .put(`/people/${id}`)
        .send({
          name: 'larry jones',
          likesRollerCoasters: true,
          heightInInches: 90
        });
      assert.equal(updatedUser.body.name, 'larry jones');
      assert.notEqual(
        updatedUser.body.likesRollerCoasters,
        getOne.body[0].likesRollerCoasters
      );
    }),
    it('DELETE /people/:id', async () => {
      const getOne = await req.get('/people');
      const id = getOne.body[0]._id;
      const deleted = await req.delete(`/people/${id}`);
      assert.doesNotHaveAnyKeys(deleted.body);
      assert.isEmpty(deleted.body);
    });
});
