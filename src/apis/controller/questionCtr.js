const Question = require('../model/questionModel');
const mongoose = require('mongoose');
const User = require("../model/userMgt/userModel"); // Update the path to your user model


// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { questionType, question, level, options, correctAnswer,solution, examId, subjectId, chapterId, topicId, subTopicId } = req.body;
    const createdBy = req.user._id; 

    if (!examId || !subjectId || !chapterId || !topicId || !subTopicId ) {
      return res.status(400).json({ success: false, error: "All categories ID  are required" });
    }
    if (!createdBy) {
      return res.status(400).json({ success: false, error: "User Id is not found" });
      
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
      subTopic: subTopicId,
      createdBy,
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

exports.publishQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { published, ...updateData } = req.body; // Destructure published and other fields

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      updateData, // Update other fields
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }

    // Update the published status separately if provided
    if (published !== undefined) {
      updatedQuestion.published = published;
      await updatedQuestion.save();
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

// Controller function to generate a user report with counts of questions created and published within a date range (default to today)
exports.generateUserReport = async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;

    // Set default start and end dates if not provided
    const today = new Date();
    const start = startDate ? new Date(startDate) : new Date(today);
    const end = endDate ? new Date(endDate) : new Date(today);

    // Set the end date to the end of the day (11:59:59 PM)
    end.setHours(23, 59, 59, 999);

    // Find the user's information by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Find the count of questions created by the user within the date range
    const createdQuestionCount = await Question.countDocuments({
      createdBy: userId,
      createdAt: { $gte: start, $lte: end },
    });

    // Find the count of questions published by the user within the date range
    const publishedQuestionCount = await Question.countDocuments({
      createdBy: userId,
      published: true,
      createdAt: { $gte: start, $lte: end },
    });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      report: {
        createdQuestionCount,
        publishedQuestionCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating the report.' });
  }
};


// Controller function to get the count of published questions by a user within a date range
exports.getCountOfPublishedQuestionsByUser = async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;

    // Convert the date strings to Date objects
    const start = startDate ? new Date(startDate) : new Date(0); // Default to the beginning of time
    const end = endDate ? new Date(endDate) : new Date(); // Default to the current date

    // Find the count of published questions by the user within the date range
    const publishedQuestionCount = await Question.countDocuments({
      createdBy: userId,
      published: true,
      createdAt: { $gte: start, $lte: end },
    });

    res.json({ publishedQuestionCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching published question count.' });
  }
};