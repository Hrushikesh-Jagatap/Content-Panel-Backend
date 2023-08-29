const Topic = require('../model/topicModel');
const mongoose = require('mongoose');

// Create a new topic
exports.createTopic = async (req, res) => {
  try {
    const { topicName, topicDescription, thumbnail, examId, subjectId, chapterId } = req.body;

    if (!examId || !subjectId || !chapterId) {
      return res.status(400).json({ success: false, error: "examId, subjectId, chpterId  are required" });
    }

    const existingTopicName = await Exam.findOne({ topicName });
    if (existingTopicName) {
      return res.status(400).json({ success: false, error: 'Topic name is already taken.' });
    }

    const newTopic = await Topic.create({
      topicName,
      topicDescription,
      thumbnail,
      exam: examId,
      subject: subjectId,
      chapter: chapterId
    });

    res.status(201).json({ success: true, data: newTopic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all topics
exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json({ success: true, data: topics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single topic by ID
exports.getTopic = async (req, res) => {
  try {

    const chapterId = req.params.id; 
    const chapterObjectId = new mongoose.Types.ObjectId(chapterId); 
    const topic = await Topic.find({ chapter: chapterObjectId }); 

    // const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ success: false, error: 'Topic not found' });
    }
    res.status(200).json({ success: true, data: topic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a topic by ID
exports.updateTopic = async (req, res) => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTopic) {
      return res.status(404).json({ success: false, error: 'Topic not found' });
    }
    res.status(200).json({ success: true, data: updatedTopic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a topic by ID
exports.deleteTopic = async (req, res) => {
  try {
    const deletedTopic = await Topic.findByIdAndDelete(req.params.id);
    if (!deletedTopic) {
      return res.status(404).json({ success: false, error: 'Topic not found' });
    }
    res.status(200).json({ success: true, data: deletedTopic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
