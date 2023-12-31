const express = require('express');
const router = express.Router();
const examController = require('../../controller/examCtr');
const authMiddleware = require("../../services/authMdlWr/authMiddleware"); //  this middleware

// Create a new exam
router.post('/createExam', authMiddleware.authenticate,  examController.createExam);

// Get all exams
router.get('/getExams', examController.getExams);

// Get a specific exam
router.get('/getExams/:id', examController.getExam);

// Update an exam
router.put('/updateExam/:id', examController.updateExam);

// Delete an exam
router.delete('/:id', examController.deleteExam);

module.exports = router;
