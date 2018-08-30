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

describe('/POST answer', () => {
  it('it should post answers to a specific id', (done) => {
    const questions = {
      question: 'What is mongoose',
      answer: 'It is a database ORM'
    };
    chai.request(server)
      .post('/api/v1/questions/1/answers')
      .send(questions)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Token', token)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.an('object');
        expect(response.body).token.to.be.a('string');
        expect(response.body).to.have.property('answer').eql('It is a databse ORM');
        expect(response.body).to.have.property('question').eql('What is Mongoose');
        expect(response.body).to.have.property('message').eql('Answer posted successfully');
        done();
      });
  });
});

describe('/PUT preferred answer', () => {
  it('it should UPDATE a specific question answer to preferred', (done) => {
    const questions = {
      question: 'What is mongoose',
      answer: 'It is a database ORM',
      preferred_answer: true
    }
    chai.request(server)
      .put('/questions/1/answers/2')
      .send(questions)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Token', token)
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response).to.be.json;
        expect(response.body).to.be.a('boolean');
        expect(response.body).to.have.property('message').eql('Preferred answer has been updated successfully');
        done();
      });
  });
});