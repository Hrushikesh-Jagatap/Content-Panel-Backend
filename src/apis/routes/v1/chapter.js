const express = require('express');
const router = express.Router();
const chapterController = require('../../controller/chapterCtr');

// Create a new chapter
router.post('/createChapter', chapterController.createChapter);

// Get all chapters
router.get('/getChapters', chapterController.getChapters);

// Get a specific chapter
router.get('/getChapters/:id', chapterController.getChapter);

// Update a chapter
router.put('/:id', chapterController.updateChapter);

// Delete a chapter
router.delete('/:id', chapterController.deleteChapter);

module.exports = router;
