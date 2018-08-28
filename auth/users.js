import bcrypt from 'bcrypt';
import pool from '../config/database';
import {
  validateSignup,

} from '../middleware/validateUsers'

export const signup = (req, res) => {
  try {
    bcrypt.hash(req.body.password, 6, (err, hash) => {
      if (err) {
        return err;
      }
      pool.query(
        'INSERT INTO users (email, fullname, username, password) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.email, req.body.fullname, req.body.username, hash],
        (err, result) => {
          if (err) {
            res.status(400).json({
              status: res.statusCode,
              message: err.detail
            });
          } else {
            const data = result.rows;
            res.status(201).json({
              data,
              status: 'Success',
              message: 'User created successfully'
            });
          }
        }
      );
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      message: err.err[0].message
    });
  }
};