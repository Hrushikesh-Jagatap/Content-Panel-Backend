// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  filename: String, // Store the uploaded file's name
  fileUrl:String,
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  subTopic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubTopic',
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserId',
    required: true
  },
});

module.exports = mongoose.model('Notes', noteSchema);
