const app = require("../lib/app");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = chai.assert;
const connect = require("../lib/connect");
const url = "mongodb://localhost:27017/mongoosePeople";

describe("mongoose tests", () => {
  const req = chai.request(app);

  // before(() => connect(url));
  // beforeEach(() => {
  //   // console.log(connect);
  //   // req.dropDatabase();
  // });

  it("model fails validation", () => {}), it("model passes validation", () => {}), it("GET /people", () => {}), it("GET /people/:id", () => {}), it("POST /people", () => {}), it("DELETE /people/:id", () => {
    // { removed: <result> }
  }), it("PUT /people/:id", () => {}), it("PATCH /people/:id", () => {});
});
