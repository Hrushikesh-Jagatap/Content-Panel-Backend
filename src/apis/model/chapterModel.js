const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  chapterName: String,
  chapterDescription: String,
  thumbnail: String, // Store the URL of the uploaded image
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
