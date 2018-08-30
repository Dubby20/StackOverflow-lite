import questions from '../models/questions';

export const allQuestionsGet = (request, response) => {
  if (!questions) return response.status(404).send('No question was found');
  return response.json(questions);
};

export const questionIdGet = (request, response) => {
  const data = questions.questions.find(item => item.questionId === parseInt(request.params.id));
  if (!data) return response.status(404).send('The question with the given ID was not found');
  return response.json(data);
};

export const questionPost = (request, response) => {
  try {
    const addQuestion = {
      questionId: questions.questions.length + 1,
      question: request.body.question,
      createdDate: Date.now()
    };
    questions.questions.push(addQuestion);

    return response.send({
      message: 'Question added successfully',
      data: addQuestion
    });
  } catch (error) {
    return response.send(error);
  }
};

export const answerPost = (request, response) => {
  try {
    const itemId = questions.questions.find(item => item.questionId === parseInt(request.params.id));
    const {
      answers
    } = itemId;
    const newAnswer = {
      answerId: answers.length + 1,
      answer: request.body.answer
    };
    answers.push(newAnswer);
    return response.send({
      message: 'Answer successfully Created',
      data: newAnswer
    });
  } catch (e) {
    return response.send(e);
  }
};

export const updateQuestion = (request, response) => {
  const updateData = questions.questions.find(item => item.questionId === parseInt(request.params.id));
  if (!updateData) return response.status(404).send('The question with the given ID was not found');
  try {
    const id = questions.questions.indexOf(updateData);
    updateData.question = request.body.question;
    questions.questions[id] = updateData;
    return response.send({
      message: 'Question has been updated successfully',
      updateData
    });
  } catch (error) {
    return response.send(error);
  }
};

export const deleteQuestion = (request, response) => {
  try {
    const deleteData = questions.questions.find(item => item.questionId === parseInt(request.params.id));
    if (!deleteData) return response.status(404).send('The question with the given ID was not found');
    const index = questions.questions.indexOf(deleteData);
    questions.questions.splice(index, 1);
    return response.send({
      message: 'Question has been deleted',
      deleteData
    });
  } catch (error) {
    return response.send(error);
  }
};