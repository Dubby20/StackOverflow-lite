import pool from '../config/database';

export const addQuestion = (req, res) => {
  try {
    pool.query('INSERT INTO questions (title, question, user_id) VALUES ($1, $2, $3) RETURNING *', [req.body.title, req.body.question, req.decoded.id], (err, result) => {
      if (err) {
        res.status(404).json({
          status: 'Error',
          message: err
        });
      } else {
        const data = result.rows[0];
        return res.status(201).json({
          data,
          status: 'Success',
          message: 'Post created successfully'
        });
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      message: err.err[0].message
    });
  }
}