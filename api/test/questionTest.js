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

describe('/GET/questions/', () => {
  it('should get all questions', (done) => {
    chai.request(server)
      .get('/api/v1/questions')
      .end((error, response) => {
        expect(response.body).to.have.status(200);
        expect(response.body.data).to.have.property('message').eql('Successful');
        expect(response.body.data).to.have.property('data').eql('array');
        done();
      });
  });
});

describe('/GET/questions/:id', () => {
  it('it should GET a question by the given id', (done) => {
    chai.request(server)
      .get('/api/v1/questions/1')
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.eql('application/json');
        // expect(response).to.be.json;
        expect(response.body).to.be.an('object');
        expect(response.body.message)
          .to.equal('Successful');
        expect(response.body).status(404).to.eql('Error');
        done();
      });
  });
});

describe('/POST questions', () => {
  it('it should post questions', (done) => {
    const questions = {
      question: 'What is mongoose'
    };
    chai.request(server)
      .post('/api/v1/questions')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Token', token)
      .send(questions)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.an('object');
        expect(response.body).token.to.be.a('string');
        expect(response.body).to.have.property('question').eql('What is Mongoose');
        expect(response.body).to.have.property('message').eql('Post created successfully');
        done();
      });
  });
});


describe('/DELETE questions', () => {
  it('it should delete a specific question id', (done) => {
    chai.request(server)
      .delete('/api/v1/questions/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Token', token)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.an('object');
        expect(response.body).token.to.be.a('string');
        expect(response.body).to.have.property('question').eql('What is Mongoose');
        expect(response.body).to.have.property('message').eql('Question has been deleted successfully');
        done();
      });
  });
});