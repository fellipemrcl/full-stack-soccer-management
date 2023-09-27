import * as sinon from "sinon";
import * as chai from "chai";

// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeTeams from "../database/models/SequelizeTeams";
import { team, teams } from "./mocks/teams.mock";

chai.use(chaiHttp);
const { expect } = chai;

describe("Teams Test", function () {
  it("should return all teams", async function () {
    sinon.stub(SequelizeTeams, "findAll").resolves(teams as any);

    const { body, status } = await chai.request(app).get("/teams");

    expect(body).to.deep.equal(teams);
    expect(status).to.equal(200);
  });

  it("should return a team by id", async function () {
    sinon.stub(SequelizeTeams, "findOne").resolves(team as any);

    const { body, status } = await chai.request(app).get("/teams/1");

    expect(body).to.deep.equal(team);
    expect(status).to.equal(200);
  });

  afterEach(sinon.restore);
});
