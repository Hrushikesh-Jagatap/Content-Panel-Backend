const express = require('express');
const router = express.Router();
const questionController = require('../../controller/questionCtr');

// Create a new question
router.post('/', questionController.createQuestion);

// Add more routes as needed

module.exports = router;
