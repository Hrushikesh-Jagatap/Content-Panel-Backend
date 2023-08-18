const express = require('express');
const router = express.Router();
const topicController = require('../../controller/topicCtr');

// Create a new topic
router.post('/', topicController.createTopic);

// Add more routes as needed

module.exports = router;
