const express = require('express');
const router = express.Router();
const topicController = require('../../controller/topicCtr');

// Create a new topic
router.post('/createTopic', topicController.createTopic);

// Get all topics
router.get('/getTopics', topicController.getTopics);

// Get a single topic by ID
router.get('/getTopics/:id', topicController.getTopic);

// Update a topic by ID
router.put('/:id', topicController.updateTopic);

// Delete a topic by ID
router.delete('/:id', topicController.deleteTopic);

module.exports = router;
