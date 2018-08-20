import express from 'express';
import {
  allQuestionsGet,
  questionIdGet,
  questionPost,
  answerPost,
  updateQuestion,
  deleteQuestion
} from '../controllers/allQuestionsController';

const router = express.Router();


// GET ALL QUESTIONS
router.get('/questions', allQuestionsGet);
router.get('/questions/:id', questionIdGet);
router.post('/questions', questionPost);
router.post('/questions/:id/answers', answerPost);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

export default router;