import express from 'express';
import {
  all_questions_get,
  answer_post,
  questionId_get,
  question_post
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
router.get('/questions', all_questions_get);
router.get('/questions/:id', questionId_get);
router.post('/questions', question_post);
router.post('/questions/:id/answers', answer_post);

export default router;