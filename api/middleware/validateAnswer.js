const validateAnswer = (request, response, next) => {
  const {
    answer
  } = request.body;

  if (!answer || answer.trim().length < 1) {
    return response.status(400).json({
      status: 'Error',
      message: 'Please enter your answer'
    });
  }
  next();
}

export default validateAnswer;