const express = require('express');
const router = express.Router();
const subTopicController = require('../../controller/subTopicCtr');

// Create a new sub-topic
router.post('/', subTopicController.createSubTopic);

// Add more routes as needed

module.exports = router;
