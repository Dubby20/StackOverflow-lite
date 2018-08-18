import express from 'express';
import {
  allQuestionsGet,
  questionIdGet,
  questionPost,
  answerPost,
  updatePost,
  deletePost
} from '../controllers/allQuestionsController';
// import {
// } from '../controllers/allQuestionsController'
// import {
//   question_post
// } from '../controllers/allQuestionsController'
// import {
//   answer_post
// } from '../controllers/allQuestionsController'

const router = express.Router()


// GET ALL QUESTIONS
router.get('/questions', allQuestionsGet);
router.get('/questions/:id', questionIdGet);
router.post('/questions', questionPost);
router.post('/questions/:id/answers', answerPost);
router.put('/questions/:id', updatePost);

export default router;