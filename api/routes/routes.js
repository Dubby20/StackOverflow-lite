import express from 'express';
import {
  allQuestionsGet,
  questionIdGet,
  answerPost,
  updateQuestion,
  deleteQuestion
} from '../controllers/allQuestionsController';

import {
  signup,
  signin
} from '../controllers/users';
import {
  addQuestion,
  allQuestions,
  getQuestionId
} from '../controllers/index';

import {
  validateSignup,
  validateSignin,
  verifyToken
} from '../middleware/validateUsers';

const router = express.Router();

router.post('/questions/:id/answers', answerPost);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

router.post('/auth/signup', validateSignup, signup);
router.post('/auth/signin', validateSignin, signin);
router.post('/questions', verifyToken, addQuestion);
router.get('/questions', allQuestions);
router.get('/questions/:id', getQuestionId);


export default router;