import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import jwt from '../helpers/jwt';
import TeamController from '../controllers/teamController';
import { teamsMock } from './testMocks';

chai.use(chaiHttp);

const { expect } = chai;



describe('Team tests', () => {
  beforeEach(() => {
    sinon.stub(TeamController, 'getAll' as any).returns(teamsMock);
  })

  afterEach(() => sinon.restore());

  it('Should return status 200, if the route is working', async () => {
    const result = await chai.request(app)
    .get('/teams')
    .send();

    expect(result.status).to.be.eq(200);
  })

  it('Should return a teams array', async () => {
    const result = await chai.request(app)
    .get('/teams')
    .send();

    expect(result.body).to.be.deep.eq(teamsMock);
  })

  it('Should return a teams for its id', async () => {
    beforeEach(() => {
      sinon.stub(TeamController, 'getById' as any).returns(teamsMock);
    })

    afterEach(() => sinon.restore());

    const result = await chai.request(app)
    .get('/teams/1')
    .send();

    expect(result.body).to.be.deep.eq(teamsMock[0]);
  })
})