import * as sinon from "sinon";
import * as chai from "chai";

// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeMatches from "../database/models/SequelizeMatches";
import { matches } from "./mocks/matches.mock";

chai.use(chaiHttp);
const { expect } = chai;

describe("Matches Test", function () {
  it("should return all matches", async function () {
    sinon.stub(SequelizeMatches, "findAll").resolves(matches as any);

    const { body, status } = await chai.request(app).get("/matches");

    expect(body).to.deep.equal(matches);
    expect(status).to.equal(200);
  });

  afterEach(sinon.restore);
});
