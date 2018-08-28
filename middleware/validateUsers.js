export const validateSignup = (req, res) => {
  const {
    email,
    fullname,
    username,
    password
  } = req.body;

  let responseCode;
  let responseObject;

  if (!email || email.search('.com') === -1 || email.search('@') === -1) {
    responseCode = 400;
    responseObject = {
      status: 'Error',
      message: 'Please enter an accurate email'
    };
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
  return res.status(responseCode).json(responseObject);
};


export const validateSignin = (req, res) => {
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
}

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.statusCode(401).json({
      message: 'Forbidden'
    });
  }
}