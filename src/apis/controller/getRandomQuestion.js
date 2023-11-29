// questionController.js
const questionService = require('../services/getRandomQuestion');

const getQuestions = async (req, res) => {

  // Call the service to generate the specified number of questions
  const numOfQues = parseInt(req.query.numOfQues, 10);
  const { questionType } = req.query;
 

  const generatedQuestions = await questionService.generateRandomPublishedQuestions(numOfQues, questionType);

  res.json(generatedQuestions);
};

module.exports = {
  getQuestions,
};
