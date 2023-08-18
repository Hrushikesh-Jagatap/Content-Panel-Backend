const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: String,
  subjectDescription: String,
  thumbnail: String, // Store the URL of the uploaded image
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true

  }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
