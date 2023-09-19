const express = require('express');
const router = express.Router();
const questionController = require('../../controller/questionCtr');

router.get('/generateUserReport', questionController.generateUserReport);

// Define the route to get the count of published questions by a user within a date range
router.get('/countPublishedByUser', questionController.getCountOfPublishedQuestionsByUser);


module.exports = router;
