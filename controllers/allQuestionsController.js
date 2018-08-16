import questions from '../models/questions';


export const all_questions_get = (req, res) => {
    let data = questions.questions.map(que => que.question)
    return res.json({
        questions: data
    });
}

// return res.json(questions)