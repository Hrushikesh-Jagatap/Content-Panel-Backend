const mongoose = require('mongoose');
const Question = require('../model/questionModel');
const getQuestionsByParameters = async (questionType, examId, subjectId, chapterId, topicId, subTopicId) => {
  try {
    const questions = await Question.find({
      questionType: questionType,
      exam: new mongoose.Types.ObjectId(examId),
      subject: new mongoose.Types.ObjectId(subjectId),
      chapter: new mongoose.Types.ObjectId(chapterId),
      topic: new mongoose.Types.ObjectId(topicId),
      subTopic: new mongoose.Types.ObjectId(subTopicId)
    });
    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

module.exports = {
  getQuestionsByParameters,
};
