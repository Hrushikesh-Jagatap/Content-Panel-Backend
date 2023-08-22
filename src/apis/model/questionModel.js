const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionType: {
    type: String,
    enum: ['subjective', 'objective'],
    required: true
  },
  question: String,
  options: [String],
  correctAnswer: Number, // Store the index of the correct option
  solution :String,
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
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
