const mongoose = require('mongoose');
const Question = require('./questionModel');

const subTopicSchema = new mongoose.Schema({
  name: String,
  questions: [Question.schema]
});

const SubTopic = mongoose.model('SubTopic', subTopicSchema);

module.exports = SubTopic;
