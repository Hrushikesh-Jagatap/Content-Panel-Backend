const express = require('express');

const router = express.Router();

const questionController = require('../../controller/questionController')

// Define a route that accepts the parameters for the GET request to generate questions
router.get('/questions', questionController.getQuestions);

module.exports = router;
