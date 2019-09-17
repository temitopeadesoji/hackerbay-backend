process.env.NODE_ENV = "test";

// Require the test dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../base");

chai.should();

chai.use(chaiHttp);

let token = "";

before(done => {
  const payload = {
    username: "david",
    password: "10011001"
  };
  chai
    .request(server)
    .post("/api/authenticate")
    .send(payload)
    .end((err, res) => {
      token = res.body.token;
      done();
    });
});

describe("/use jsonpatch", () => {
  it("it should not grant access to a user without token header", done => {
    const json = {
      jsonobject: {},
      jsonpatch: {
        op: "add",
        path: "/foo",
        value: "world"
      }
    };
    chai
      .request(server)
      .post("/api/jsonpatch")
      .send(json)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});

describe("/use jsonpatch", () => {
  it("it should grant access to user but throw error invalid body", done => {
    const json = {
      jsonpatch: {
        op: "add",
        path: "/foo",
        value: "world"
      }
    };
    chai
      .request(server)
      .post("/api/jsonpatch")
      .send(json)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        res.body.error.should.be.a("string");
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
});

describe("/use jsonpatch", () => {
  it("it should not grant access to the user and throw error expired token", done => {
    const json = {
      jsonobject: {},
      jsonpatch: {
        op: "add",
        path: "/foo",
        value: "world"
      }
    };
    chai
      .request(server)
      .post("/api/jsonpatch")
      .send(json)
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4MTA0MTQyNDA0IiwiaWF0IjoxNTY4MjM3NDg1LCJleHAiOjE1NjgzMjM4ODV9.S28Zr9YYh1cwUGVx8v-hpUjHVbfIqFZo0IwIaXfRI3Y"
      )
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/use jsonpatch", () => {
  it("it should grant access to the user and patch the object", done => {
    const json = {
      jsonobject: {},
      jsonpatch: {
        op: "add",
        path: "/foo",
        value: "world"
      }
    };
    chai
      .request(server)
      .post("/api/jsonpatch")
      .send(json)
      .set("token", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.json.should.have.property("foo").eql("world");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });
});
