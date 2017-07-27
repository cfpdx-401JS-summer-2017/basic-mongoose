const app = require("../../lib/app");
const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
const mongoose = require("../../lib/connect");
const connection = require("mongoose").connection;
const connect = require("mongoose").connect;
const seedPeople = require('../testdata/seedPeople');

chai.use(chaiHttp);

describe("mongoose tests", () => {
  const req = chai.request(app);

  before(() => connect);
  beforeEach(() => connection.dropDatabase());

  function save(person) {
    return req.post('/people')
      .send(person)
      .then(res => {
        // console.log('7:');
        return JSON.parse(res.text);
      });
  };

  it.only("GET /people", () => {
    return Promise.all(seedPeople.map(person => {
      return save(person)
    }))
    .then(res => {

      for(let i = 0; i < res.length; i++){

     if (res[i].success){
        console.log('Success!')
      } else {
      console.log(res[i].personName +' could not be saved to the database. '+res[i].message);
      }
    }
          return req.get("/people");

      })

      .then(data => {
        console.log(data.text);

        // assert.equal(data.text.count, 1)
      })
  }),


it("GET /people/:id", () => {}), it("POST /people", () => {}), it("DELETE /people/:id", () => {
    // { removed: <result> } T/F
  }), it("PUT /people/:id", () => {}), it("PATCH /people/:id", () => {});
});

// findById then update actually does a patch