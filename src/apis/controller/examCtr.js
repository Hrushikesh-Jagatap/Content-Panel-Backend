const Exam = require('../models/examModel');

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

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json({ success: true, data: exams });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ success: false, error: 'Exam not found' });
    }
    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedExam) {
      return res.status(404).json({ success: false, error: 'Exam not found' });
    }

    res.status(200).json({ success: true, data: updatedExam });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ success: false, error: 'Exam not found' });
    }

    await exam.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
