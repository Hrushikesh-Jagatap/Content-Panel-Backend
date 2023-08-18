const SubTopic = require('../models/subTopicModel');

exports.createSubTopic = async (req, res) => {
  try {
    const { subTopicName, subTopicDescription, thumbnail, examId, subjectId, chapterId, topicId } = req.body;

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

// Add more controller functions as needed
