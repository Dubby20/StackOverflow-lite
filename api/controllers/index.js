import pool from '../config/database';

/**
 * @param {object} request
 * @param {object} response
 * @returns {object} object 
 */
export const allQuestions = (request, response) => {
  try {
    pool.query('SELECT * FROM questions', (error, result) => {
      if (error) {
        response.status(404).json({
          status: 'Error',
          message: error.message
        });
      } else {
        const data = result.rows;

        if (data.length === 0) {
          return response.status(200).json({
            messsage: 'There is no question yet'
          });
        }
        return response.status(200).json({
          data,
          message: 'Successful'
        });
      }
    });
  } catch (error) {
    response.status(400).json({
      status: 'Error',
      message: error.error[0].message
    });
  }
};

/**
 * @param {object} request
 * @param {object} response
 * @returns {object} object 
 */
export const addQuestion = (request, response) => {
  try {
    pool.query('INSERT INTO questions (title, question, user_id) VALUES ($1, $2, $3) RETURNING *',
      [request.body.title, request.body.question, request.decoded.id], (error, result) => {
        if (error) {
          response.status(404).json({
            status: 'Error',
            message: error.message
          });
        } else {
          const data = result.rows[0];
          return response.status(201).json({
            data,
            status: 'Success',
            message: 'Post created successfully'
          });
        }
      });
  } catch (error) {
    response.status(400).json({
      status: 'Error',
      message: error.error[0].message
    });
  }
};

/**
 * @param {object} request
 * @param {object} response
 * @returns {object} object 
 */
export const getQuestionId = (request, response) => {
  try {
    pool.query('SELECT * FROM questions WHERE id = $1',
      [request.params.id], (error, result) => {
        if (error) {
          return response.status(404).json({
            status: 'Error',
            message: 'Question id not found'
          });
        } else {
          const data = result.rows;
          response.status(200).json({
            data,
            message: 'Successful'
          });
        }
      });
  } catch (error) {
    response.status(400).json({
      status: 'Error',
      message: error.error[0].message
    });
  }
};
/**
 * Delete A User
 * @param {object} request
 * @param {object} response
 */
export const deleteQuestionId = (request, response) => {
  try {
    pool.query('SELECT * FROM questions WHERE questions.id = $1',
      [request.params.id], (error, result) => {
        if (error) {
          return response.status(400).json({
            message: 'Question does not exist'
          });
        }
        if (request.decoded.id === result.rows[0].user_id) {
          pool.query('DELETE FROM questions WHERE questions.id = $1',
            [request.params.id], (error, result) => {
              if (result) {
                response.status(200).json({
                  message: 'Question has been deleted successfully'
                });
              }
            });
        } else {
          return response.status(401).json({
            message: 'Unauthorized'
          });
        }
      });
  } catch (error) {
    response.status(400).json({
      status: 'Error',
      message: error.message
    });
  }
};

/**
 * @param {object} request
 * @param {object} response
 * @returns {object} object 
 */
export const addAnswer = (request, response) => {
  pool.query('INSERT INTO answers (user_id, answer, question_id) VALUES ($1, $2, $3) RETURNING *',
      [request.decoded.id, request.body.answer, request.params.id])
    .then((data) => {
      return response.status(200).json({
        data: data.rows[0],
        message: 'Answer posted successfully'
      });

    }).catch((error) => {
      response.status(500).json({
        message: `error ${error}`
      });
    });
};

/**
 * @param {object} request
 * @param {object} response
 * @returns {boolean} updated answer 
 */
export const preferAnswer = (request, response) => {
  pool.query('UPDATE answers SET preferred_answer= true WHERE answers.id = $1',
      [request.params.id])
    .then((data) => {
      return response.status(200).json({
        data: data.rows[0],
        message: 'Preferred answer has been updated successfully'
      });
    }).catch((error) => {
      response.status(500).json({
        message: `${error}`
      });
    });
};