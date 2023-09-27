import * as sinon from "sinon";
import * as chai from "chai";
import * as jwt from "jsonwebtoken";

// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeUser from "../database/models/SequelizeUser";
import { user, token, validLoginFromTheBody } from "./mocks/login.mock";

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

  afterEach(sinon.restore);
});
