// questionController.js
const questionService = require('../services/questionService');

const getQuestions = async (req, res) => {
  
  const { questionType, exam, subject, chapter, topic, subTopic, numOfQuestions } = req.query;
  
  // Call the service to generate the specified number of questions
  const generatedQuestions = await questionService.generateQuestions(questionType, exam, subject, chapter, topic, subTopic, numOfQuestions);
  
  res.json(generatedQuestions);
};

module.exports = {
  getQuestions,
};
