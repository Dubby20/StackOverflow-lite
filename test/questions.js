process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

import questions from '../models/questions';
const expect = chai.expect;

chai.use(chaiHttp);
describe('questions', () => {
  beforeEach((done) => {
    questions.remove({}, (err) => {
      done();
    });
  });
});

// Test the /GET all questions route
describe('/GET questions', () => {
  it('it should GET all questions', (done) => {
    chai.request(server)
      .get('/api/v1/users/questions')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('/GET/questions/:id', () => {
  it('it should GET a question by the given id', (done) => {
    chai.request(server)
      .get('/api/v1/users/questions/:id')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        // expect(res.body).to.eql(questions);
        done();
      });
  });
});

describe('/POST questions', () => {
  it('it should post questions', (done) => {
    // let que = {
    //   questionId: questions.questions.length + 1,
    //   question: 'What is mongoose',
    //   created_date: Date.now()
    // }
    chai.request(server)
      .post('/api/v1/users/questions')
      // .send(que)
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Question added successfully ');
        done();
      });
  });
});

describe('/POST answer', () => {
  it('it should post answers to a specific id', (done) => {
    // let que = {
    //   questionId: questions.questions.length + 1,
    //   question: 'What is mongoose',
    //   created_date: Date.now()
    // }
    chai.request(server)
      .post('/api/v1/users/questions/:id/answers')
      // .send(que)
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(201);
        // expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Answer successfully added');
        done();
      });
  });
});

describe('/PUT questions', () => {
  it('it should UPDATE a specific question id', (done) => {
    chai.request(server)
      .put('/api/v1/users/questions/:id')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Question has been updated successfully');
        done();
      });
  });
});

describe('/DELETE questions', () => {
  it('it should delete a specific question id', (done) => {
    chai.request(server)
      .delete('/api/v1/users/questions/:id')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Question has been deleted');
        done();
      });
  });
});