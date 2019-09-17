process.env.NODE_ENV = "test";

// Require the test dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../base");

chai.should();

chai.use(chaiHttp);

let token = "";

before(done => {
  const user = {
    username: "david",
    password: "10011001"
  };
  chai
    .request(server)
    .post("/api/authenticate")
    .send(user)
    .end((err, res) => {
      token = res.body.token;
      done();
    });
});

describe("/generatethumbnail", () => {
  it("it should not grant access to the user without token header", done => {
    const body = {
      // url: "http://localhost:2251/uploads/test.png"
      url: "https://images.unsplash.com/photo-1425326452142-67c31f601d2f"
    };
    chai
      .request(server)
      .post("/api/generate-thumbnail")
      .send(body)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(500);
        done();
      });
  });
});

describe("/generatethumbnail", () => {
  it("it should grant access to the user but throw error invalid body", done => {
    const body = {};
    chai
      .request(server)
      .post("/api/generate-thumbnail")
      .send(body)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(2);
        res.body.should.have.property("error");
        res.body.error.should.be.a("string");
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
});

describe("/generatethumbnail", () => {
  it("it should grant access to the user and generate a thumbnail for the image sent", done => {
    const body = {
      // url: "http://localhost:2251/uploads/test.png"
      url: "https://images.unsplash.com/photo-1425326452142-67c31f601d2f"
    };
    chai
      .request(server)
      .post("/api/generate-thumbnail")
      .send(body)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql(1);
        res.body.resizedImage.should.be.a("string");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });
});
