import express from 'express';
import {
  allQuestionsGet,
  questionIdGet,
  questionPost,
  answerPost,
  updateQuestion,
  deleteQuestion
} from '../controllers/allQuestionsController';
import {
  signup,
  signin
} from '../auth/users';

const router = express.Router();

router.get('/questions', allQuestionsGet);
router.get('/questions/:id', questionIdGet);
router.post('/questions', questionPost);
router.post('/questions/:id/answers', answerPost);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);



export default router;