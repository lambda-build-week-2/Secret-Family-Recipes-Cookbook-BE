import chai from 'chai';
import chaiHttp from 'chai-http';
import { it, describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();
describe('Tests to create a User', () => {
  const userObject = {
    email: 'adex001@gmail.com',
    firstName: 'Adeoye',
    lastName: 'Ebenezer',
    password: 'password',
  };
  it('should create a user ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(userObject)
      .end((err, response) => {
        response.body.status.should.eql(201);
        response.body.data.should.be.an('object');
        done();
      });
  });
  const userObject2 = {
    email: 'adex004@gmail.com',
    firstName: 'Adeoye',
    lastName: 'Ebenezer',
    password: 'password',
  };
  it('should create a user ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(userObject2)
      .end((err, response) => {
        response.body.status.should.eql(201);
        response.body.data.should.be.an('object');
        done();
      });
  });
});
describe('Tests to Signin a User', () => {
  const userObject = {
    email: 'adex001@gmail.com',
    password: 'password',
  };
  it('should signin a user ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(userObject)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('object');
        done();
      });
  });
  const userObject2 = {
    email: 'adex004@gmail.com',
    password: 'password',
  };
  it('should signin a user ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(userObject2)
      .end((err, response) => {
        response.body.status.should.eql(200);
        response.body.data.should.be.an('object');
        done();
      });
  });
});
