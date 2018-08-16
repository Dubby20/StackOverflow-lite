import express from 'express';
import {
  all_questions_get
} from '../controllers/allQuestionsController'

const router = express.Router();



// GET ALL QUESTIONS
router.get('/api/v1/users', all_questions_get)

export default router;