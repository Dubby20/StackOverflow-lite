import questions from '../models/questions';

export const questionId_get = (req, res) => {
  // questionId = (id) => {
  //   questions.questions.map(que => que.question_id);

  // }
  let data = questions.questions.filter(que => que.questionId === req.params.id)
  console.log(data)
  return res.json(data)
  //console.log(questionId)
}