// questionController.js
const examService = require('../services/examSubService');

const getQuestions = async (req, res) => {
  const { exam, subject, topic, page, questionType, perPage } = req.query;

  // Call the service to generate the specified number of questions
  

  const generatedQuestions = await examService.generateQuestions(exam, subject, topic, page, questionType, perPage);

  res.json(generatedQuestions);
};

module.exports = {
  getQuestions,
};
