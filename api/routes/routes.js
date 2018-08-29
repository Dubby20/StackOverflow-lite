import express from 'express';

import {
  signup,
  signin
} from '../controllers/users';
import {
  addQuestion,
  allQuestions,
  getQuestionId,
  deleteQuestionId,
  postAnswer,
  preferAnswer
} from '../controllers/index';

import {
  validateSignup,
  validateSignin,
  verifyToken
} from '../middleware/validateUsers';

import {
  validateQuestion,
  checkQuestion
} from '../middleware/validateQuestion';
import validateAnswer from '../middleware/validateAnswer';

const router = express.Router();

// router.put('/questions/:id', updateQuestion);

router.post('/auth/signup', validateSignup, signup);
router.post('/auth/signin', validateSignin, signin);
router.post('/questions', verifyToken, validateQuestion, addQuestion);
router.get('/questions', allQuestions);
router.get('/questions/:id', getQuestionId);
router.delete('/questions/:id', verifyToken, deleteQuestionId);
router.post('/questions/:id/answers', verifyToken, checkQuestion, validateAnswer, postAnswer);
router.put('/questions/:id/answers/:id', verifyToken, preferAnswer);


export default router;