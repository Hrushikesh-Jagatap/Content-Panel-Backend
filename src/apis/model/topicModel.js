const mongoose = require('mongoose');
const SubTopic = require('./subTopicModel');

const topicSchema = new mongoose.Schema({
  name: String,
  subTopics: [SubTopic.schema]
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
