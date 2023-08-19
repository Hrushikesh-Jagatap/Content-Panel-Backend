const SubTopic = require('../models/subTopicModel');

// Create a new subtopic
exports.createSubTopic = async (req, res) => {
  try {
    const { subTopicName, subTopicDescription, thumbnail, examId, subjectId, chapterId, topicId } = req.body;

    if (!examId || !subjectId || !chapterId || !topicId ) {
      return res.status(400).json({ success: false, error: " examId , subjectId , chapterId, topicId  are required" });
    }

    const newSubTopic = await SubTopic.create({
      subTopicName,
      subTopicDescription,
      thumbnail,
      exam: examId,
      subject: subjectId,
      chapter: chapterId,
      topic: topicId
    });

    res.status(201).json({ success: true, data: newSubTopic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all subtopics
exports.getSubTopics = async (req, res) => {
  try {
    const subTopics = await SubTopic.find();
    res.status(200).json({ success: true, data: subTopics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single subtopic by ID
exports.getSubTopic = async (req, res) => {
  try {
    const subTopic = await SubTopic.findById(req.params.id);
    if (!subTopic) {
      return res.status(404).json({ success: false, error: 'SubTopic not found' });
    }
    res.status(200).json({ success: true, data: subTopic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a subtopic by ID
exports.updateSubTopic = async (req, res) => {
  try {
    const updatedSubTopic = await SubTopic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSubTopic) {
      return res.status(404).json({ success: false, error: 'SubTopic not found' });
    }
    res.status(200).json({ success: true, data: updatedSubTopic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a subtopic by ID
exports.deleteSubTopic = async (req, res) => {
  try {
    const deletedSubTopic = await SubTopic.findByIdAndDelete(req.params.id);
    if (!deletedSubTopic) {
      return res.status(404).json({ success: false, error: 'SubTopic not found' });
    }
    res.status(200).json({ success: true, data: deletedSubTopic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
