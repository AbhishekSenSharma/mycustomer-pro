var chai = require("chai");
var expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../app");
describe("Get all location utility", function () {
  it("should return all country", async () => {
    let res = await chai.request(app).get("/api/util/countries");
    expect(res.status).to.equal(200);
  });

  it("should return all states", async () => {
    let res = await chai.request(app).get("/api/util/states/India");
    expect(res.status).to.equal(200);
  });

  it("should return all cities", async () => {
    let res = await chai.request(app).get("/api/util/cities/Karnataka");
    expect(res.status).to.equal(200);
  });
});
