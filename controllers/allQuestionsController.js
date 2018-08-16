import questions from '../models/questions';


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
    res.json(questions)
}

// return res.json(questions)