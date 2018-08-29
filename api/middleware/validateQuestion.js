import pool from '../config/database';

export const validateQuestion = (request, response, next) => {
  const {
    title,
    question
  } = request.body;

  if (!title || title.trim().length < 1) {
    return response.status(400).json({
      status: 'Error',
      message: 'Please enter a title'
    });
  }
  if (!question || question.trim().length < 1) {
    return response.status(400).json({
      status: 'Error',
      message: 'Please enter your question'
    });
  }
  if (!question.trim() && !title.trim()) {
    return response.status(400).json({
      status: 'Error',
      message: 'Please enter the correct fields'
    });
  }
  next();

}

export const checkQuestion = (request, response, next) => {

  pool.query('SELECT * FROM questions where questions.id = $1',
      [request.params.id])
    .then((data) => {
      if (data.rows.length > 0) {
        return next();
      }
      return response.status(404).json({
        message: 'Question Not Found'
      });
    })
    .catch((error) => {
      response.status(500).json({
        message: `error ${error}`
      });
    });
}