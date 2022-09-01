import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import jwt from '../helpers/jwt';
import TeamController from '../controllers/teamController';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
  {
    "id": 5,
    "teamName": "Cruzeiro"
  },
  {
    "id": 6,
    "teamName": "Ferroviária"
  },
  {
    "id": 7,
    "teamName": "Flamengo"
  },
  {
    "id": 8,
    "teamName": "Grêmio"
  },
  {
    "id": 9,
    "teamName": "Internacional"
  },
  {
    "id": 10,
    "teamName": "Minas Brasília"
  },
  {
    "id": 11,
    "teamName": "Napoli-SC"
  },
  {
    "id": 12,
    "teamName": "Palmeiras"
  },
  {
    "id": 13,
    "teamName": "Real Brasília"
  },
  {
    "id": 14,
    "teamName": "Santos"
  },
  {
    "id": 15,
    "teamName": "São José-SP"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
];

describe.only('Team tests', () => {
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