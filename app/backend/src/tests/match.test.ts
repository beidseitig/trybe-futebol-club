import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import MatchController from '../controllers/matchController';
import { matchesMock } from './testMocks';
import jwt from '../helpers/jwt';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;


describe.only('Matches tests', () => {
  describe('Should test the getAll method', () => {
    beforeEach(() => {
      sinon.stub(MatchController, 'getAll' as any).returns(matchesMock);
    })
  
    afterEach(() => sinon.restore());
  
    it('Should return status 200, if the route is working', async () => {
      const result = await chai.request(app)
      .get('/matches')
      .send();
  
      expect(result.status).to.be.eq(200);
    })
  
    it('Should return a matches array', async () => {
      const result = await chai.request(app)
      .get('/matches')
      .send();
  
      expect(result.body).to.be.deep.eq(matchesMock);
    })
  })
  

  // describe('Test if is possible to create matches', async () => {
  //   beforeEach(() => {
  //     sinon.stub(jwt, 'verifyToken').returns({ email: 'admin@admin.com' });
  //     sinon.stub(MatchController, 'addMatch' as any).returns({
  //       'id': 1,
  //       'homeTeam': 1,
  //       'awayTeam': 2,
  //       'homeTeamGoals': 1,
  //       'awayTeamGoals': 2,
  //       'inProgress': true
  //     });
  //   })
  
  //   afterEach(() => sinon.restore());

  //   it('Should not create a new match if the teams id are equal', async () => {
  //     const result = await chai.request(app)
  //     .post('/matches')
  //     .send({
  //       homeTeam: 1,
  //       awayTeam: 1,
  //       homeTeamGoals: 1,
  //       awayTeamGoals: 1
  //     });
  
  //     expect(result.body).to.be.deep.eq({ message: 'It is not possible to create a match with two equal teams' });
  //   })
  // })

  describe('Test the token validation', async () => {
    beforeEach(() => {
      sinon.stub(MatchController, 'addMatch' as any).returns({ id: 1 });
    })
  
    afterEach(() => sinon.restore());

    it('Should return the error message if the token is invalid', async () => {
      const result = await chai.request(app)
      .post('/matches')
      .send({
        homeTeam: 1,
        awayTeam: 2,
        homeTeamGoals: 1,
        awayTeamGoals: 2
      });
  
      expect(result.body).to.be.deep.eq({ message: 'Token must be a valid token' });
    })

  })

  

  describe('Test if is possible to uptade matches', async () => {
    beforeEach(() => {
      sinon.stub(MatchController, 'updateMatch' as any).returns(matchesMock);
    })
  
    afterEach(() => sinon.restore());

    it('Should return status 200, if is possible to uptade the status of a match', async () => {
      const result = await chai.request(app)
      .patch('/matches/1/finish')
      .send({id: 1, inProgress: true});
  
      expect(result.status).to.be.eq(200);
    })

    it('Should return "Match updated", if is possible to uptade the status of a match', async () => {
      const result = await chai.request(app)
      .patch('/matches/1/finish')
      .send({id: 1, inProgress: true});
  
      expect(result.body).to.be.deep.eq({ message: 'Match updated' });
    })
  })
})