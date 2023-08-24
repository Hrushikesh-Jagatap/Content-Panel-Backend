const Question = require('../model/questionModel');
const mongoose = require('mongoose');

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { questionType, question, level, options, correctAnswer,solution, examId, subjectId, chapterId, topicId, subTopicId } = req.body;

    if (!examId || !subjectId || !chapterId || !topicId || !subTopicId ) {
      return res.status(400).json({ success: false, error: "All categories ID  are required" });
    }
    const newQuestion = await Question.create({
      questionType,
      question,
      level,
      options,
      correctAnswer,
      solution,
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

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single question by ID
exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a question by ID
exports.updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }
    res.status(200).json({ success: true, data: updatedQuestion });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }
    res.status(200).json({ success: true, data: deletedQuestion });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
