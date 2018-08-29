import pool from '../config/database';

export const allQuestions = (request, response) => {
  try {
    pool.query('SELECT * FROM questions', (err, result) => {
      if (err) {
        response.status(404).json({
          status: 'Error',
          message: err
        });
      } else {
        const data = result.rows;
        return response.status(200).json({
          data,
          message: 'Successful'
        });
      }
    });
  } catch (err) {
    response.status(400).json({
      status: 'Error',
      message: err.err[0].message
    });
  }
}

export const addQuestion = (request, response) => {
  try {
    pool.query('INSERT INTO questions (title, question, user_id) VALUES ($1, $2, $3) RETURNING *', [request.body.title, request.body.question, request.decoded.id], (err, result) => {
      if (err) {
        response.status(404).json({
          status: 'Error',
          message: err
        });
      } else {
        const data = result.rows[0];
        return response.status(201).json({
          data,
          status: 'Success',
          message: 'Post created successfully'
        });
      }
    })
  } catch (err) {
    response.status(400).json({
      status: 'Error',
      message: err.err[0].message
    });
  }
};

export const getQuestionId = (request, response) => {
  try {
    pool.query('SELECT * FROM questions WHERE id = $1', [request.params.id], (err, result) => {
      if (err) {
        response.status(404).json({
          status: 'Error',
          message: err
        });
      } else {
        const data = result.rows;
        return response.status(200).json({
          data,
          message: 'Successful'
        });
      }
    });
  } catch (err) {
    response.status(400).json({
      status: 'Error',
      message: err.err[0].message
    });
  }
};

export const deleteQuestionId = (request, response) => {
  console.log(request.decoded);
  try {
    pool.query('SELECT * FROM questions WHERE id = $1', [request.params.id], (err, result) => {
      if (err) {
        response.status(400).json({
          message: err
        })
      }
      if (request.decoded.id === result.rows[0].user_id) {
        pool.query('DELETE FROM questions where id = $1', [request.params.id], (err, result) => {
          if (result) {
            response.status(200).json({
              message: 'Question deleted successfully'
            });
          }
        });
      } else {
        return response.status(401).json({
          message: 'Unauthorized'
        });
      }
    });
  } catch (err) {
    response.status(400).json({
      status: 'Error',
      message: err.message
    });
  }
};