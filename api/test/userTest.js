import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import server from '../server';


const {
  expect
} = chai;

let email;
let id;
const token = jwt.sign({
    email,
    id
  },
  'secret', {
    expiresIn: '24h'
  });

chai.use(chaiHttp);
describe('create user signup', () => {
  it('it should register a new user', (done) => {
    const newUser = {
      email: 'jacdubby@yahoo.com',
      username: 'Dubby',
      password: 'mochatest'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, response) => {
        console.log(response.body);
        expect(response).to.have.status(201);
        expect(response.body.data).to.be.an('object');
        expect(response.body.data).to.have.property('email').to.eql('jacdubby@yahoo.com');
        expect(response.body.data).to.have.property('username').to.eql('Dubby');
        expect(response.body).to.have.property('message').to.eql('User created successfully');
        expect(response.body.token).to.be.a('string');
        done();
      });
  });

  it('should not register a user when the email already exists', (done) => {
    const newUser = {
      email: 'jacdubby@yahoo.com',
      username: 'Dubby',
      password: 'mochatest'
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.eql('Error');
        done();
      });
  });
});


describe('create user signin', () => {
  it('it should login an existing user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'jacdubby@yahoo.com',
        password: 'mochatest'
      })
      .end((err, response) => {
        expect(response).to.have.status(200);
        // expect(response.body).to.be.an('object');
        // expect(response.body.data).to.have.property('email').to.eql('jacdubby@yahoo.com');
        // expect(response.body.data).to.have.property('message').to.eql('Successfully signed in');
        // expect(response.body.token).to.be.a('string');
        done();
      });
  });

  it('should not sign in a user when the email is wrong', (done) => {
    const user = {
      email: 'jacdubby@gmail.com',
      password: 'mochatest'
    };
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.eql('Invalid login details. Email or password is incorrect');
        expect(response.body.status).to.eql('Error');
        done();
      });
  });


  it('should not sign in a user when the password is wrong', (done) => {
    const user = {
      email: 'jacdubby@gmail.com',
      password: 'mochtect56'
    }
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Token', token)
      .send(user)
      .end((error, response) => {
        expect(response.status).to.eql(400);
        expect(response.body).to.be.an('object');
        expect(response.body.message)
          .to.equal('Invalid login details. Email or password wrong');
        expect(response.body.status).to.eql('Error');
        done();
      });
  });
});

// Test Token
describe('Token', () => {
  it('should not authorize user access when not signed in', (done) => {
    chai.request(server)
      .post('/api/v1/questions/')
      .end((err, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.have.property('message').to.eql('Unauthorized');
        done();
      });
  });
});