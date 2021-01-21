var chai = require("chai");
var customer = require("../models/customer");
var expect = chai.expect;
var sinon = require("sinon");
var fs = require("fs");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
var TodoMock;
var mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();
delete require.cache[require.resolve("../middleware/check-auth")];
// Second we need rewrite the cached sum module to be as follows:
require.cache[require.resolve("../middleware/check-auth")] = {
  exports: sinon.stub(),
};
// Third we need to require the doStuff module again
var authStub = require("../middleware/check-auth");
authStub.callsFake((req, res, next) => {
  req.userData = { userId: id.toString() };
  next();
});

app = require("../app");

describe("Get all customer", function () {
  beforeEach(function () {
    TodoMock = sinon.mock(customer);
  });
  afterEach(function () {
    TodoMock.restore();
  });

  it("should return all customer", async () => {
    var expectedResult = [
      [
        {
          email: "test",
          _id: "2222",
        },
      ],
    ];
    TodoMock.expects("aggregate").resolves(expectedResult);
    let res = await chai.request(app).get("/api/customer/");
    TodoMock.verify();
    expect(res.body.message).to.equal("Posts fetched successfully!");
  });

  it("Upload save customer", async () => {
    testMock = sinon.mock(mongoose.Model.prototype);
    testMock.expects("save").resolves({ _id: 33 });

    var res = await chai
      .request(app)
      .post("/api/customer")
      .set("userData", { userId: 777 })
      .attach(
        "image",
        fs.readFileSync("./backend/test/WIN_20150513_073013.JPG"),
        "WIN_20150513_073013.JPG"
      )
      .field("name", "some name")
      .field("email", "some@name")
      .field("city", "kk")
      .field("state", "dddd")
      .field("country", "ssssss")
      .field("products", id.toString());
    testMock.verify();

    expect(res.status).to.equal(201);
  });

  it("Upload update customer", async () => {
    TodoMock.expects("updateOne").resolves({ n: 33 });
    var res = await chai
      .request(app)
      .put("/api/customer/" + id.toString())
      .set("userData", { userId: id.toString() })
      .attach(
        "image",
        fs.readFileSync("./backend/test/WIN_20150513_073013.JPG"),
        "WIN_20150513_073013.JPG"
      )
      .field("name", "some name")
      .field("email", "some@name")
      .field("city", "kk")
      .field("state", "dddd")
      .field("country", "ssssss")
      .field("products", id.toString());
    TodoMock.verify();

    expect(res.status).to.equal(200);
  });

  it("Delete customer", async () => {
    TodoMock.expects("deleteOne").resolves({ n: 33 });
    var res = await chai.request(app).delete("/api/customer/" + id.toString());
    TodoMock.verify();

    expect(res.status).to.equal(200);
  });
});
