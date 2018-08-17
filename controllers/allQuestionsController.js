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
        console.log('Post added successfully')
        res.send(addQuestion)
    } catch (error) {
        console.error(error)
    }
}