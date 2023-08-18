const express = require('express');
const examController = require('../../controller/examCtr');



const router = express.Router();

// Create a new exam
router.post('/exam',examController.createExam )
 

module.exports = router;
