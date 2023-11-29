const express = require('express');
const router = express.Router();

const questionController = require('../../controller/getRandomQuestion')
// Define a route that accepts the parameters for the GET request to random generate questions
router.get('/question', questionController.getQuestions);

module.exports = router;
