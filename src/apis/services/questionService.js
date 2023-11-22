const {getQuestionsByParameters} = require('../services/fetchQuestion')
const generateQuestions = async(questionType, exam, subject, chapter, topic, subTopic, numOfQuestions) => {
  // Logic to generate the specified number of questions based on the parameters
  const filteredQuestions = await getQuestionsByParameters(questionType, exam, subject, chapter, topic, subTopic);
//  return  filteredQuestions
  
  const selectedQuestions = await selectRandomQuestions(filteredQuestions, numOfQuestions);
  const questionsWithOptions = selectedQuestions.map(question => {
    return {
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer
    };
  });
  return questionsWithOptions;
};
const selectRandomQuestions = (questions, numOfQuestions) => {
  const selectedQuestions = [];
  const totalQuestions = questions.length;
  if (numOfQuestions >= totalQuestions) {
    return questions; // Return all questions if the requested number is greater than or equal to the total available questions
  }
  // Randomly select numOfQuestions from the available questions
  while (selectedQuestions.length < numOfQuestions) {
    const randomIndex = Math.floor(Math.random() * totalQuestions);
    const randomQuestion = questions[randomIndex];
    if (!selectedQuestions.includes(randomQuestion)) {
      selectedQuestions.push(randomQuestion);
    }
  }
  console.log('++++++++++++++', selectedQuestions);
  return selectedQuestions;
};
module.exports = {
  generateQuestions,
};
