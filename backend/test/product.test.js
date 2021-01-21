var chai = require("chai");
var Todo = require("../models/product");
var TodoCustomer = require("../models/customer");
var expect = chai.expect;
var sinon = require("sinon");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
delete require.cache[require.resolve('../middleware/check-auth')];
// Second we need rewrite the cached sum module to be as follows:
require.cache[require.resolve('../middleware/check-auth')] = {
  exports: sinon.stub(),
};
// Third we need to require the doStuff module again
var authStub = require('../middleware/check-auth');
authStub.callsFake((req, res, next) => {
  req.userData ={userId:id.toString()};
  next();
});

app = require("../app");
describe("Get all Products", function () {
  it("should return all todos", async () => {
    var TodoMock = sinon.mock(Todo);
    TodoMock.expects("find").resolves([]);
    let res = await chai
      .request(app)
      .get("/api/product");
    TodoMock.verify();
    TodoMock.restore();
    expect(res.status).to.equal(200);
  });
// todo need sinon mongoose
  it("should return all todos with customers", async () => {
    var TodoMock2 = sinon.mock(TodoCustomer);
    TodoMock2.expects("find").resolves(TodoCustomer);
    let res = await chai
      .request(app)
      .get("/api/product/customers");
    TodoMock2.verify();
    TodoMock2.restore();
    expect(res.status).to.equal(500);
  });

});


