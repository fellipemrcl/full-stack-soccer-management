import * as sinon from "sinon";
import * as chai from "chai";
import * as jwt from "jsonwebtoken";

// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeUser from "../database/models/SequelizeUser";
import {
  user,
  token,
  validLoginFromTheBody,
  noEmailLoginFromTheBody,
  missingFieldsMessage,
  noPasswordLoginFromTheBody,
  invalidEmailLoginFromTheBody,
  invalidPasswordLoginFromTheBody,
  nonexistentUser,
  invalidFieldsMessage,
  nonexistentPassword,
} from "./mocks/login.mock";

chai.use(chaiHttp);
const { expect } = chai;

describe("Login Test", function () {
  it("should login user and return the token", async function () {
    sinon.stub(SequelizeUser, "findOne").resolves(user as any);
    sinon.stub(jwt, "sign").returns(token as any);

    const { body, status } = await chai
      .request(app)
      .post("/login")
      .send(validLoginFromTheBody);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ token });
  });

  it("should return an error when there's no e-mail field", async function () {
    const { body, status } = await chai
      .request(app)
      .post("/login")
      .send(noEmailLoginFromTheBody);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: missingFieldsMessage });
  });

  it("should return an error when there's no password field", async function () {
    const { body, status } = await chai
      .request(app)
      .post("/login")
      .send(noPasswordLoginFromTheBody);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: missingFieldsMessage });
  });

  it("should return an error when there's an invalid email", async function () {
    const { body, status } = await chai
      .request(app)
      .post("/login")
      .send(invalidEmailLoginFromTheBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: invalidFieldsMessage });
  });

  it("should return an error when there's an invalid password", async function () {
    const { body, status } = await chai
      .request(app)
      .post("/login")
      .send(invalidPasswordLoginFromTheBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: invalidFieldsMessage });
  });

  it("should return an error when there's an unregistered email", async function () {
    sinon.stub(SequelizeUser, "findOne").resolves(null);
    const { body, status } = await chai
      .request(app)
      .post("/login")
      .send(nonexistentUser);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: invalidFieldsMessage });
  });

  it("should return an error when there's an unregistered password", async function () {
    sinon.stub(SequelizeUser, "findOne").resolves(null);
    const { body, status } = await chai
      .request(app)
      .post("/login")
      .send(nonexistentPassword);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: invalidFieldsMessage });
  });

  it("shouldn't return the user role without a token", async function () {
    const { status, body } = await chai.request(app).get("/login/role");

    expect(status).to.equal(401);
    expect(body.message).to.equal("Token not found");
  });

  it("shouldn't return the user role with an invalid token", async function () {
    const { status, body } = await chai
      .request(app)
      .get("/login/role")
      .set("authorization", "invalidToken");

    expect(status).to.equal(401);
    expect(body.message).to.equal("Token must be a valid token");
  });

  /* it("should return the user role with a valid token", async () => {
    const loginResponse = await chai.request(app).post("/login").send({
      email: validLoginFromTheBody.email,
      password: validLoginFromTheBody.password,
    });

    const validToken = loginResponse.body.token;

    const res = await chai
      .request(app)
      .get("/login/role")
      .set("authorization", `Bearer ${validToken}`);

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ role: "admin" });
  }); */

  afterEach(sinon.restore);
});
