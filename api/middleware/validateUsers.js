import jwt from 'jsonwebtoken';

export const validateSignup = (request, response, next) => {
  const {
    email,
    username,
    password
  } = request.body;

  if (!email || email.search('.com') === -1 || email.search('@') === -1) {
    return response.status(400).send({
      status: 'Error',
      message: 'Please enter accurate email'
    });
  }

  if (!username || username.trim().length < 1) {
    return response.status(400).json({
      status: 'Error',
      message: 'Please enter your email'
    });
  }

  if (!password || password.trim().length < 1) {
    return response.status(400).json({
      status: 'Error',
      message: 'Please enter your email'
    });
  }

  if (!password || password.trim().length < 6) {
    return response.status(400).json({
      status: 'Error',
      message: 'Password must be at least 6 characters long'
    });
  }

  if (!email || !password) {
    return response.status(400).json({
      status: 'Error',
      message: 'Email or password is missing'
    });
  }
  next();
};


export const validateSignin = (request, response, next) => {
  const {
    email,
    password
  } = request.body;

  if (!email || email.search('.com') === -1 || email.search('@') === -1) {
    return response.status(400).send({
      status: 'Error',
      message: 'Please enter an accurate email'
    });
  }
  if (!password || password.trim().length < 1) {
    return response.status(400).json({
      status: 'Error',
      message: 'Please enter your email'
    });
  }

  if (!password || password.trim().length < 6) {
    return response.status(400).json({
      status: 'Error',
      message: 'Password must be at least 6 characters long'
    });
  }
  next();
};

/**
 * Verify Token
 * @param {object} request 
 * @param {object} response
 * @param {object} next
 * @returns {object} response object 
 */
export const verifyToken = (request, response, next) => {
  const {
    token
  } = request.headers;
  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return response.status(401).json({
          message: 'Authentication failed'
        });
      }
      request.decoded = decoded;
      console.log(request.decoded);
      next();
    });
  } else {
    response.status(401).json({
      message: 'Unauthorized'
    });
  }
};