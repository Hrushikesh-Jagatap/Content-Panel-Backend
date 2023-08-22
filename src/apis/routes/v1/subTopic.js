const express = require('express');
const router = express.Router();
const subTopicController = require('../../controller/subTopicCtr');

// Create a new subtopic
router.post('/createSubTopic', subTopicController.createSubTopic);

// Get all subtopics
router.get('/', subTopicController.getSubTopics);

// Get a single subtopic by ID
router.get('/:id', subTopicController.getSubTopic);

// Update a subtopic by ID
router.put('/:id', subTopicController.updateSubTopic);

// Delete a subtopic by ID
router.delete('/:id', subTopicController.deleteSubTopic);

module.exports = router;
