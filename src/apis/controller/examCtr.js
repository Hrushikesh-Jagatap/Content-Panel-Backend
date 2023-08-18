const Exam = require('../model/examModel');

exports.createExam = async (req, res) => {
  try {
    const { examName, examDescription, thumbnail } = req.body;

    const newExam = await Exam.create({
      examName,
      examDescription,
      thumbnail
    });

    res.status(201).json({ success: true, data: newExam });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add more controller functions as needed
