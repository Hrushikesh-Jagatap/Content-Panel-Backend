const mongoose = require('mongoose');
const Subject = require('../model/subjectModel');

exports.createSubject = async (req, res) => {
  try {
    const { subjectName, subjectDescription, thumbnail, examId } = req.body;

    if (!examId  ) {
      return res.status(400).json({ success: false, error: "Exam  ID is required" });
    }

    const existingSubjectName = await Exam.findOne({ subjectName });
    if (existingSubjectName) {
      return res.status(400).json({ success: false, error: 'Subject name is already taken.' });
    }

    const newSubject = await Subject.create({
      subjectName,
      subjectDescription,
      thumbnail,
      exam: examId // Linking the subject to the exam by using the exam's ObjectId
    });

    res.status(201).json({ success: true, data: newSubject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getSubject = async (req, res) => {
  try {
    const examId = req.params.id; // Extract the exam ID from the URL parameter
    const examObjectId = new mongoose.Types.ObjectId(examId); // Convert examId to ObjectId
    const subject = await Subject.find({ exam: examObjectId }); // Use findOne instead of find

    if (!subject) {
      return res.status(404).json({ success: false, error: 'Subject not found' });
    }
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedSubject) {
      return res.status(404).json({ success: false, error: 'Subject not found' });
    }

    res.status(200).json({ success: true, data: updatedSubject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({ success: false, error: 'Subject not found' });
    }

    await subject.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
