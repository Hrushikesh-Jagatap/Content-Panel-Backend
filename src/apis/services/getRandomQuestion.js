const Question = require('../model/questionModel');
 
const generateRandomPublishedQuestions = async (numOfQues, questionType) => {
  try {
  
    let query = { published: true };
    if (questionType === 'subjective' || questionType === 'multipleChoice') {
      query.questionType = questionType;
    }

    let randomPublishedQuestions;
    if (numOfQues > 0) {
      randomPublishedQuestions = await Question.aggregate([
        { $match: query },
        { $sample: { size: numOfQues } }
      ]);
    } else {
      randomPublishedQuestions = await Question.find(query).limit(5);
    }

    return randomPublishedQuestions;
  } catch (error) {
    throw new Error('Failed to generate random published questions');
  }
};

module.exports = {
  generateRandomPublishedQuestions,
};
