import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database';


export const signup = (request, response) => {
  try {
    /**
     * Hash Password Method
     * @param {string} password
     * @returns {string} returns hashed password
     */
    bcrypt.hash(request.body.password, 1, (error, hash) => {
      if (error) {
        return error;
      }
      pool.query(
        'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *',
        [request.body.email, request.body.username, hash],
        (error, result) => {
          if (error) {
            return response.status(400).json({
              status: 'Error',
              message: error.detail
            });
          }
          const {
            email,
            id
          } = result.rows[0];
          /**
           * Gnerate Token
           * @param {string} id 
           * @param {string} email 
           * @returns {string} token
           */
          if (result) {
            const token = jwt.sign({
                id,
                email
              },
              'secret', {
                expiresIn: '24h'
              });
            response.status(201).json({
              token,
              data: result.rows[0],
              status: 'Success',
              message: 'User created successfully'
            });
          } else {
            return response.status(404).json({
              status: 'Error',
              message: `Invalid details. Email or password is incorrect ${error}`
            });
          }
        }

      );
    });
  } catch (error) {
    response.status(400).json({
      status: 'Error',
      message: error.error[0].message
    });
  }
};


/**
 * Sign in
 * @param {object} request 
 * @param {object} response
 * @returns {object} user object 
 */
export const signin = (request, response) => {
  try {
    pool.query('SELECT * FROM users WHERE email = $1',
      [request.body.email], (error, result) => {
        console.log(request.body);
        if (error) {
          console.log(error);
          return response.status(400).json({
            status: 'Error333333',
            message: error
          });
        }
        const {
          email,
          id,
          password
        } = result.rows[0];
        console.log(result[0]);
        /**
         * comparePassword
         * @param {string} hashPassword 
         * @param {string} password 
         * @returns {Boolean} return True or False
         */
        bcrypt.compare(request.body.password, password, (err, res) => {
          if (err) {
            console.log(error);
            return response.status(400).json({
              status: 'Error------',
              message: `Invalid login details. Email or password is incorrect ${error}`
            });
          }
          /**
           * Gnerate Token
           * @param {string} id 
           * @param {string} email   * 
           * @returns {string} token
           */
          if (res) {
            const token = jwt.sign({
                email,
                id
              },
              'secret', {
                expiresIn: '24h'
              });
            response.status(200).json({
              status: 'Success',
              message: 'Successfully signed in',
              token,
              data: result.rows[0]
            });
          } else {
            return response.status(404).json({
              status: 'Error11111',
              message: 'Invalid login details. Email or password is incorrect'
            });
          }
        });
      });
  } catch (error) {
    console.log(error);
    response.status(400).json({
      status: 'Error22222',
      message: error.error[0].message
    });
  }
};