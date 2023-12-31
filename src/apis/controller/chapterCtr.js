
const mongoose = require('mongoose');
const Exam = require('../model/examModel');

const Chapter = require('../model/chapterModel');

// Vikash create your chapter 
exports.createChapter = async (req, res) => {
  try {
    const { chapterName, chapterDescription, thumbnail, examId, subjectId } = req.body;

    if (!examId || !subjectId) {
      return res.status(400).json({ success: false, error: "Both 'examId' and 'subjectId' are required" });
    }

    const existingChapterName = await Exam.findOne({ chapterName });
    if (existingChapterName) {
      return res.status(400).json({ success: false, error: 'Chapter name is already taken.' });
    }

    const newChapter = await Chapter.create({
      chapterName,
      chapterDescription,
      thumbnail,
      exam: examId, // Linking the chapter to the exam by using the exam's ObjectId
      subject: subjectId // Linking the chapter to the subject by using the subject's ObjectId
    });

    res.status(201).json({ success: true, data: newChapter });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.status(200).json({ success: true, data: chapters });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getChapter = async (req, res) => {
  try {

    const subjectId = req.params.id; 
    const subjectObjectId = new mongoose.Types.ObjectId(subjectId); 
    const chapter = await Chapter.find({ subject: subjectObjectId }); 


    // const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ success: false, error: 'Chapter not found' });
    }
    res.status(200).json({ success: true, data: chapter });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateChapter = async (req, res) => {
  try {
    const updatedChapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedChapter) {
      return res.status(404).json({ success: false, error: 'Chapter not found' });
    }

    res.status(200).json({ success: true, data: updatedChapter });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);

    if (!chapter) {
      return res.status(404).json({ success: false, error: 'Chapter not found' });
    }

    await chapter.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
