const Topic = require('../models/topicModel');

exports.createTopic = async (req, res) => {
  try {
    const { topicName, topicDescription, thumbnail, examId, subjectId, chapterId } = req.body;

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

// Add more controller functions as needed
