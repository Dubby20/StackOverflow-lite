import jwt from 'jsonwebtoken';

export const validateSignup = (req, res, next) => {
  const {
    email,
    fullname,
    username,
    password
  } = req.body;

  let responseCode;
  let responseObject;

  if (!email || email.search('.com') === -1 || email.search('@') === -1) {
    return res.status(400).send({
      status: 'Error',
      message: 'Please enter accurate email'
    });
  }

  if (!fullname || fullname.trim().length < 1) {
    return res.status(400).send({
      status: 'Error',
      message: 'Please enter your fullname'
    });
  }


  if (!username || username.trim().length < 1) {
    return res.status(400).json({
      status: 'Error',
      message: 'Please enter your email'
    });
  }

  if (!password || password.trim().length < 1) {
    return res.status(400).json({
      status: 'Error',
      message: 'Please enter your email'
    });
  }

  if (!password || password.trim().length < 6) {
    return res.status(400).json({
      status: 'Error',
      message: 'Password must be at least 6 characters long'
    });
  }
  next();
};


export const validateSignin = (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if (!email || email.search('.com') === -1 || email.search('@') === -1) {
    return res.status(400).send({
      status: 'Error',
      message: 'Please enter an accurate email'
    });
  }
  if (!password || password.trim().length < 1) {
    return res.status(400).json({
      status: 'Error',
      message: 'Please enter your email'
    });
  }

  if (!password || password.trim().length < 6) {
    return res.status(400).json({
      status: 'Error',
      message: 'Password must be at least 6 characters long'
    });
  }
  next();
};

export const verifyToken = (req, res, next) => {
  // const bearerHeader = req.headers.authorization;
  // if (typeof bearerHeader !== 'undefined') {
  //   const bearer = bearerHeader.split(' ');
  //   const bearerToken = bearer[1];
  //   req.token = bearerToken;
  // }
  const {
    token
  } = req.headers;
  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.sendStatus(401).json({
          message: 'Authentication failed'
        });
      }
      req.decoded = decoded;
      console.log(req.decoded);
      next();
    });
  } else {
    res.status(401).json({
      message: 'Unauthorized'
    });
  }
};