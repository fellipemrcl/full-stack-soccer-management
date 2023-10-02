import * as sinon from "sinon";
import * as chai from "chai";
import * as jwt from "jsonwebtoken";

// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeMatches from "../database/models/SequelizeMatches";
import {
  finishedMessage,
  matches,
  newMatch,
  notFoundMessage,
  updateMatchBody,
  updatedMatch,
} from "./mocks/matches.mock";
import MatchService from "../services/MatchService";

chai.use(chaiHttp);
const { expect } = chai;

describe("Matches Test", function () {
  describe("#errorHandling", function () {
    it("#getAllMatches should return a 500 status", async function () {
      const error = new Error("An error occurred");
      sinon.stub(MatchService.prototype, "getAllMatches").throws(error);

      const { body, status } = await chai.request(app).get("/matches");

      expect(status).to.equal(500);
      expect(body).to.deep.equal({ message: error.message });
    });

    it("#getMatchesByQuery should return a 500 status", async function () {
      const error = new Error("An error occurred");
      sinon.stub(MatchService.prototype, "getMatchesByQuery").throws(error);

      const { body, status } = await chai
        .request(app)
        .get("/matches?inProgress=true");

      expect(status).to.equal(500);
      expect(body).to.deep.equal({ message: error.message });
    });

    /* it("#updateMatch should return a 500 status", async function () {
      const error = new Error("An error occurred");
      sinon.stub(MatchService.prototype, "updateMatch").throws(error);

      const { body, status } = await chai.request(app).get("/matches/1");

      expect(status).to.equal(500);
      expect(body).to.deep.equal({ message: error.message });
    }); */
  });

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

  it("should update a match", async function () {
    sinon.stub(SequelizeMatches, "update").resolves([1] as any);
    sinon.stub(SequelizeMatches, "findByPk").resolves(updateMatchBody as any);
    sinon.stub(jwt, "verify").resolves();

    const { id } = updatedMatch;

    const { status, body } = await chai
      .request(app)
      .patch(`/matches/${id}`)
      .set("authorization", "validToken")
      .send({ data: finishedMessage });

    expect(status).to.equal(200);
  });

  it("shouldn't update a match with an invalid id", async function () {
    sinon.stub(SequelizeMatches, "findByPk").resolves(null);
    sinon.stub(jwt, "verify").resolves();

    const { status, body } = await chai
      .request(app)
      .patch(`/matches/1000`)
      .set("authorization", "validToken")
      .send({ data: notFoundMessage });

    expect(status).to.equal(404);
  });

  afterEach(sinon.restore);
});
