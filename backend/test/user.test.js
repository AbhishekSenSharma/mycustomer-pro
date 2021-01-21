var chai = require("chai");
var Todo = require("../models/user");
var expect = chai.expect;
var sinon = require("sinon");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../app");
const mongoose = require("mongoose");
describe("Get all users", function () {
  it("should return all users", async () => {
    var TodoMock = sinon.mock(Todo);
    process.env.JWT_KEY = "secret_this_should_be_longer";
    var expectedResult = {
      email: "test",
      _id: "2222",
    };
    const bcrypt = require("bcryptjs");
    var bycrptStub = sinon.stub(bcrypt, "compare");
    bycrptStub.callsFake(() => {
      return true;
    });
    TodoMock.expects("findOne").resolves(expectedResult);
    let res = await chai
      .request(app)
      .post("/api/user/login")
      .send({ email: "Charlie", password: "9" });
    TodoMock.verify();
    TodoMock.restore();
    expect(res.body.userId).to.equal("2222");
  });

  it("should return fail login", async () => {
    var TodoMock = sinon.mock(Todo);
    process.env.JWT_KEY = "secret_this_should_be_longer";
    var expectedResult = {
      email: "test",
      _id: "2222",
    };
    TodoMock.expects("findOne").resolves(undefined);
    let res = await chai
      .request(app)
      .post("/api/user/login")
      .send({ email: "Charlie", password: "9" });
    TodoMock.verify();
    TodoMock.restore();
    expect(res.error.status).to.equal(401);
  });

});

beforeEach(function () {
  testMock = sinon.mock(mongoose.Model.prototype);
});

afterEach(() => {
  testMock.restore();
});
describe("Save Usr", function () {
  it("should create user signup", async () => {
    testMock.expects("save").resolves("success");

    let res = await chai
      .request(app)
      .post("/api/user/signup")
      .send({ email: "Charlie", password: "9" });
    testMock.verify();

    expect(res.status).to.equal(201);
  });

  it("should user signup fail", async () => {
    testMock.expects("save").rejects("failure");

    let res = await chai
      .request(app)
      .post("/api/user/signup")
      .send({ email: "Charlie", password: "9" });
    testMock.verify();

    expect(res.status).to.equal(500);
  });

});
