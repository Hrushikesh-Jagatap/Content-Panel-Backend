const Question = require('../models/questionModel');

exports.createQuestion = async (req, res) => {
  try {
    const {
      questionType,
      question,
      options,
      correctAnswer,
      examId,
      subjectId,
      chapterId,
      topicId,
      subTopicId
    } = req.body;

    const newQuestion = await Question.create({
      questionType,
      question,
      options,
      correctAnswer,
      exam: examId,
      subject: subjectId,
      chapter: chapterId,
      topic: topicId,
      subTopic: subTopicId
    });

    res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add more controller functions as needed
