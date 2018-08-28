import questions from '../models/questions';

export const allQuestionsGet = (req, res) => {
    if (!questions) return res.status(404).send('No question was found');
    return res.json(questions);
};

export const questionIdGet = (req, res) => {
    const data = questions.questions.find(que => que.questionId === parseInt(req.params.id));
    if (!data) return res.status(404).send('The question with the given ID was not found');
    return res.json(data);
};

export const questionPost = (req, res) => {
    try {
        const addQuestion = {
            questionId: questions.questions.length + 1,
            question: req.body.question,
            createdDate: Date.now()
        };
        questions.questions.push(addQuestion);

        return res.send({
            message: 'Question added successfully',
            data: addQuestion
        });
    } catch (error) {
        return res.send(error);
    }
};

export const answerPost = (req, res) => {
    try {
        const queId = questions.questions.find(que => que.questionId === parseInt(req.params.id));
        const {
            answers
        } = queId;
        const newAnswer = {
            answerId: answers.length + 1,
            answer: req.body.answer
        };
        answers.push(newAnswer);
        return res.send({
            message: 'Answer successfully Created',
            data: newAnswer
        });
    } catch (e) {
        return res.send(e);
    }
};

export const updateQuestion = (req, res) => {
    const updateData = questions.questions.find(que => que.questionId === parseInt(req.params.id));
    if (!updateData) return res.status(404).send('The question with the given ID was not found');
    try {
        const id = questions.questions.indexOf(updateData);
        updateData.question = req.body.question;
        questions.questions[id] = updateData;
        return res.send({
            message: 'Question has been updated successfully',
            updateData
        });
    } catch (error) {
        return res.send(error);
    }
};

export const deleteQuestion = (req, res) => {
    try {
        const deleteData = questions.questions.find(que => que.questionId === parseInt(req.params.id));
        if (!deleteData) return res.status(404).send('The question with the given ID was not found');
        const index = questions.questions.indexOf(deleteData);
        questions.questions.splice(index, 1);
        return res.send({
            message: 'Question has been deleted',
            deleteData
        });
    } catch (error) {
        return res.send(error);
    }
};