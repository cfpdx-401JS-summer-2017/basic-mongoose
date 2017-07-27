const app = require("../../lib/app");
const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
const mongoose = require("../../lib/connect");
const connection = require("mongoose").connection;
const connect = require("mongoose").connect;

chai.use(chaiHttp);

describe("mongoose tests", () => {
  const req = chai.request(app);

  before(() => connect);
  beforeEach(() => connection.dropDatabase());

  const seedPeople = [
    // { name: 'elizabeth', nose: 'tiny', heightInInches:50, likesRollerCoasters:true },
    { name: 'joann', job: 'web dev' }
    // ,
    // { name: 'elton', talent: 'piano', likesRollerCoasters:null},
    // {
    //   name: 'oliver', quirks: [
    //     { annoying: "clips toenails on transit" },
    //     { healthy: "always buys rounds" }
    //   ]
    // },
    // { name: "james", hobby: "collects subway tokens from around the world", heightInInches: 64}
  ]

  function save(person) {
    // console.log('PPP: ', person);
    return req.post('/people')
      .send(person)
      .then(res => {
        console.log('7');
        return JSON.parse(res.text);
      });
  };

  it.only("GET /people", () => {
    return Promise.all(seedPeople.map(person => {
      return save(person)
    }))
    .then(res => {
      console.log('test: ',res)
      return req.get("/people")
      .then(data => {
        // console.log(res.text);
      })
  });
}),

it("GET /people/:id", () => {}), it("POST /people", () => {}), it("DELETE /people/:id", () => {
    // { removed: <result> } T/F
  }), it("PUT /people/:id", () => {}), it("PATCH /people/:id", () => {});
});

// findById then update actually does a patch