const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Create a new question
router.post('/', questionController.createQuestion);

// Get all questions
router.get('/', questionController.getQuestions);

// Get a single question by ID
router.get('/:id', questionController.getQuestion);

// Update a question by ID
router.put('/:id', questionController.updateQuestion);

// Delete a question by ID
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
