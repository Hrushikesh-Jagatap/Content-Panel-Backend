const Question = require('../model/questionModel');
const mongoose = require('mongoose');

const generateQuestions = async (exam, subject, topic, page, questionType = 'multipleChoice', perPage) => {
  const query = { published: true };
  if (questionType === 'subjective' || questionType === 'multipleChoice') {
    query.questionType = questionType;
  }
  const pageSize = parseInt(perPage) || 10;
  const pageNumber = page || 1;
  const skip = (pageNumber - 1) * pageSize;

  try {
    const questions = await Question.aggregate([
      {
        $match: {
          exam: new mongoose.Types.ObjectId(exam),
          subject: new mongoose.Types.ObjectId(subject),
          topic: new mongoose.Types.ObjectId(topic),
          ...query
        },
      },
      {
        $skip: skip
      },
      {
        $limit: pageSize
      },
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

    return questions;
  } catch (error) {
    throw new Error('Failed to generate questions');
  }
};

module.exports = {
  generateQuestions,
};
