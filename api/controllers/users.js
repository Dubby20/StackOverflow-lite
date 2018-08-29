import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database';


export const signup = (req, res) => {
  try {
    bcrypt.hash(req.body.password, 6, (err, hash) => {
      if (err) {
        return err;
      }
      pool.query(
        'INSERT INTO users (email, fullname, username, password) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.email, req.body.fullname, req.body.username, hash],
        (error, result) => {
          if (error) {
            return res.status(400).json({
              status: res.statusCode,
              message: error.detail
            });
          }
          const {
            email,
            id
          } = result.rows[0];
          if (result) {
            const token = jwt.sign({
                id,
                email
              },
              'secret', {
                expiresIn: '24h'
              });
            res.status(201).json({
              token,
              status: 'Success',
              message: 'User created successfully'
            });
          } else {
            return res.status(404).json({
              status: 'Error',
              message: 'Invalid details'
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


export const signin = (req, res) => {
  console.log('HI');
  try {
    pool.query('SELECT * FROM users WHERE email = $1', [req.body.email], (err, result) => {
      console.log(result);
      if (err) {
        return res.status(400).json({
          status: 'Error',
          message: err.detail
        });
      }
      // if (result.rows[0]) {
      //   data
      //  } else
      const {
        email,
        id,
        password
      } = result.rows[0];
      bcrypt.compare(req.body.password, password, (err, result) => {
        if (err) {
          return res.status(400).json({
            status: 'Error',
            message: 'Invalid login details. Email or password is incorrect'
          });
        }
        if (result) {
          const token = jwt.sign({
              email,
              id
            },
            'secret', {
              expiresIn: '24h'
            });
          res.status(200).json({
            status: 'Success',
            message: 'Successfully Signed in',
            token
          });
        } else {
          return res.status(404).json({
            status: 'Error',
            message: 'Invalid login details. Email or password is incorrect'
          });
        }
      });
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      message: err.err[0].message
    });
  }
};