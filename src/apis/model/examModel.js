const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  examName: String,
  examDescription: String,
  thumbnail: String, // Store the URL of the uploaded image
  createdAt: { type: Date, default: Date.now },

});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
