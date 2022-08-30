import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import jwt from '../helpers/jwt';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock = {
  email: 'admin@admin.com' as string,
  password: 'secret_admin' as string,
}

const invalidLoginMock = {
  email: 'test@test.com' as string,
  password: 'password_test' as string,
}

describe('Login tests', () => {
  beforeEach(() => {
    sinon.stub(jwt, 'createToken').returns('test_token');
  })

  afterEach(() => sinon.restore());

  it('Should return status 200, if is a valid user', async () => {
    const result = await chai.request(app)
    .post('/login')
    .send(loginMock);

    expect(result.status).to.be.eq(200);
  })

  it('Should return a valid token', async () => {
    const result = await chai.request(app)
    .post('/login')
    .send(loginMock);

    expect(result.body).to.be.deep.eq({ token: 'test_token'});
  })

  it('Should return status 400, if email or password is blank', async () => {
    const result = await chai.request(app)
    .post('/login')
    .send({});

    expect(result.status).to.be.eq(400);
  })

  it('Should return the error message "All fields must be filled", if email or password is blank', async () => {
    const result = await chai.request(app)
    .post('/login')
    .send({});

    expect(result.body).to.be.deep.eq({ message: 'All fields must be filled' });
  })

  it('Should return the error message "Incorrect email or password", if email or password is incorrect', async () => {
    const result = await chai.request(app)
    .post('/login')
    .send(invalidLoginMock);

    expect(result.body).to.be.deep.eq({ message: 'Incorrect email or password' });
  })
})

