// Require the test dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../base");

chai.should();

chai.use(chaiHttp);

describe("/login user", () => {
  it("it should log user in and send token", done => {
    const user = {
      username: "nipek",
      password: "nipek"
    };
    chai
      .request(server)
      .post("/api/authenticate")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(1);
        res.body.should.have.property("token");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });
});

describe("/login user", () => {
  it("it should throw error for incomplete data (invalid username or password)", done => {
    const user = {
      username: "david"
    };
    chai
      .request(server)
      .post("/api/authenticate")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(2);
        res.body.should.not.have.property("token");
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
});
