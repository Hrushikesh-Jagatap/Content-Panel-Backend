// controllers/notesController.js
const cloudinary = require('cloudinary');
const Exam = require('../model/examModel');

const Note = require('../model/notes');
// import getDataUri from "../services/dataUri";
const getDataUri = require('../services/dataUri');
exports.createNote = async (req, res) => {
  try {
    
    const {filename, examId, subjectId, chapterId, topicId, subTopicId } = req.body;
    const createdBy = req.user._id; 

    if (!examId || !subjectId || !chapterId || !topicId || !subTopicId ) {
      return res.status(400).json({ success: false, error: "All categories ID  are required" });
    }
    const file = req.file;

    const fileUri = getDataUri(file);
  
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  


    const newNote = new Note({
      filename: filename,
      fileUrl: mycloud.secure_url,
      exam: examId,
      subject: subjectId,
      chapter: chapterId,
      topic: topicId,
      subTopic: subTopicId,
      createdBy,
    });
    await newNote.save();
    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a note by ID
exports.updateNoteById = async (req, res) => {
  try {
    const { filename, originalName } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { filename, originalName },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a note by ID
exports.deleteNoteById = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    res.status(200).json({ success: true, data: deletedNote });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
