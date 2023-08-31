const express = require('express');
const router = express.Router();
const questionController = require('../../controller/questionCtr');
const authMiddleware = require("../../services/authMdlWr/authMiddleware"); //  this middleware

// Create a new question
router.post('/createQuestion', authMiddleware.authenticate, questionController.createQuestion);

// Get all questions
router.get('/getAllQues', questionController.getQuestions);

// Get a single question by ID
router.get('/:id', questionController.getQuestion);

// Update a question by ID
router.put('/:id', authMiddleware.authenticate, questionController.updateQuestion);

// publish a question by ID
router.put('/publish/:id', authMiddleware.authenticate, questionController.publishQuestion);

// Delete a question by ID
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
