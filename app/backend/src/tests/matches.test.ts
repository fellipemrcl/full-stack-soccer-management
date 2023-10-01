import * as sinon from "sinon";
import * as chai from "chai";
import * as jwt from "jsonwebtoken";

// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeMatches from "../database/models/SequelizeMatches";
import { matches, newMatch } from "./mocks/matches.mock";

chai.use(chaiHttp);
const { expect } = chai;

describe("Matches Test", function () {
  it("should return all matches", async function () {
    sinon.stub(SequelizeMatches, "findAll").resolves(matches as any);

    const { body, status } = await chai.request(app).get("/matches");

    expect(body).to.deep.equal(matches);
    expect(status).to.equal(200);
  });

  it("should return a filtered match by query", async function () {
    sinon.stub(SequelizeMatches, "findAll").resolves(matches as any);

    const { body, status } = await chai
      .request(app)
      .get("/matches?inProgress=true");

    expect(body).to.deep.equal(matches);
    expect(status).to.equal(200);
  });

  it("should create a match", async function () {
    sinon.stub(SequelizeMatches, "create").resolves(newMatch as any);
    sinon.stub(jwt, "verify").resolves();

    const { id, ...sendData } = newMatch;

    const { status, body } = await chai
      .request(app)
      .post("/matches")
      .set("authorization", "validToken")
      .send(sendData);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(newMatch);
  });

  afterEach(sinon.restore);
});
