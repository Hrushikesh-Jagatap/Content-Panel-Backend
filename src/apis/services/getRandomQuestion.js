const Question = require('../model/questionModel');

const generateRandomPublishedQuestions = async (numOfQues, questionType) => {
  try {
    const query = { published: true };
    if (questionType === 'subjective' || questionType === 'multipleChoice') {
      query.questionType = questionType;
    }

    let randomPublishedQuestions;
    if (numOfQues > 0) {
      randomPublishedQuestions = await Question.aggregate([
        { $match: query },
        { $sample: { size: numOfQues } },
        {
          $project: {
            question: 1,
            options: 1,
            correctAnswer: 1,
            solution: 1,
            level: 1,
            published: 1
          }
        }
      ]);
    } else {
      randomPublishedQuestions = await Question.find(query, {
        question: 1,
        options: 1,
        correctAnswer: 1,
        solution: 1,
        level: 1,
        published: 1
      }).limit(5);
    }

    return randomPublishedQuestions;
  } catch (error) {
    throw new Error('Failed to generate random published questions');
  }
};

module.exports = {
  generateRandomPublishedQuestions,
};
