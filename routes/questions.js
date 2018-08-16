import express from 'express';
import {
  all_questions_get
} from '../controllers/allQuestionsController'
import {
  questionId_get
} from '../controllers/questionIdController'

const router = express.Router();



// GET ALL QUESTIONS
router.get('/api/v1/users', all_questions_get)
router.get('/:id/api/v1/users', questionId_get)

export default router;