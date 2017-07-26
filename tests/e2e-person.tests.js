const app = require("../lib/app");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = chai.assert;
const connect = require("../lib/connect");
const url = "mongodb://localhost:27017/mongoosePeople";
const mongoose = require("../lib/connect");
const connection = require("mongoose").connection;

describe("mongoose tests", () => {
  const req = chai.request(app);

  before(() => mongoose.connect);
  beforeEach(() => connection.dropDatabase());

  it("GET /people", () => {}), it("GET /people/:id", () => {}), it("POST /people", () => {}), it("DELETE /people/:id", () => {
    // { removed: <result> } T/F
  }), it("PUT /people/:id", () => {}), it("PATCH /people/:id", () => {});
});
