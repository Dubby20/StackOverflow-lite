import express from 'express';
import {
  all_questions_get
} from '../controllers/allQuestionsController'
import {
  questionId_get
} from '../controllers/allQuestionsController'
import {
  question_post
} from '../controllers/allQuestionsController'

const router = express.Router();



// GET ALL QUESTIONS
router.get('/api/v1/users', all_questions_get)
router.get('/api/v1/users/:id', questionId_get)
router.post('/api/v1/users', question_post)

export default router;