const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  topicName: String,
  topicDescription: String,
  thumbnail: String, // Store the URL of the uploaded image
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
  }

});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
