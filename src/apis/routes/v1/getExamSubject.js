const express = require('express');
const router = express.Router();

const examSubController = require('../../controller/examSubController');
// Define a route that accepts the parameters for the GET request to generate questions
router.get('/', examSubController.getQuestions);

module.exports = router;
