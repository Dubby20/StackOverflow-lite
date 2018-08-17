import questions from '../models/questions';

//GET ALL QUESTIONS
export const all_questions_get = (req, res) => {
    // let data = questions.questions.map(que => ({
    //     question: que.question,
    //     id: que.questionId,
    //     userId: que.user_id,
    //     createdAt: que.created_date
    // }))
    // // console.log(data)
    // return res.json({
    //     questions: data
    // });
    if (!questions) return res.status(404).send('No question was found');
    return res.json(questions)
}

//GET QUESTION OF A SPECIFIC ID
export const questionId_get = (req, res) => {
    const data = questions.questions.find(que => que.questionId == req.params.id)
    if (!data) return res.status(404).send('The question with the given ID was not found')
    // console.log(data)
    return res.json(data)
}

//POST QUESTION
export const question_post = (req, res) => {
    const addQuestion = {
        questionId: questions.questions.length + 1,
        question: req.body.question,
        created_date: Date.now()
    };
    try {
        questions.questions.push(addQuestion)
        // console.log('Question added successfully')

        return res.send({
            message: "Question added successfully",
            data: addQuestion
        })
    } catch (error) {
        return res.send(error)
    }
}

//POST ANSWER
export const answer_post = (req, res) => {
    try {
        const queId = questions.questions.find(que => que.questionId == req.params.id)
        const answers = queId.answers;
        const newAnswer = {
            answer_id: answers.length + 1,
            answer: req.body.answer,
        }
        answers.push(newAnswer);
        return res.send({
            message: "Successfully Created",
            data: newAnswer,
        })
    } catch (e) {
        return res.send(e)
    }
}