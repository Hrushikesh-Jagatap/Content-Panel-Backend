const express = require('express');
const router = express.Router();
const chapterController = require('../../controller/chapterCtr');

// Create a new chapter
router.post('/', chapterController.createChapter);

// Add more routes as needed

module.exports = router;
