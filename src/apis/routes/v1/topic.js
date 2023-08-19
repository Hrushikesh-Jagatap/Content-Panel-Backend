const express = require('express');
const router = express.Router();
const topicController = require('../../controllers/topicController');

// Create a new topic
router.post('/', topicController.createTopic);

// Get all topics
router.get('/', topicController.getTopics);

// Get a single topic by ID
router.get('/:id', topicController.getTopic);

// Update a topic by ID
router.put('/:id', topicController.updateTopic);

// Delete a topic by ID
router.delete('/:id', topicController.deleteTopic);

module.exports = router;
