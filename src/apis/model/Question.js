const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String
});

const subTopicSchema = new mongoose.Schema({
  name: String,
  questions: [questionSchema]
});

const topicSchema = new mongoose.Schema({
  name: String,
  subTopics: [subTopicSchema]
});

const chapterSchema = new mongoose.Schema({
  name: String,
  topics: [topicSchema]
});

const subjectSchema = new mongoose.Schema({
  name: String,
  chapters: [chapterSchema]
});

const examSchema = new mongoose.Schema({
  name: String,
  subjects: [subjectSchema]
});

const categorySchema = new mongoose.Schema({
  name: String,
  exams: [examSchema]
});

const Questions = mongoose.model('Questions', categorySchema);

module.exports = Questions;




