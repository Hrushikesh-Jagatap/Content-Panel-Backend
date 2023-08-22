const express = require('express');
const router = express.Router();
const subjectController = require('../../controller/subjectCtr');

// Create a new subject
router.post('/createSubject', subjectController.createSubject);

// Get all subjects
router.get('/', subjectController.getSubjects);

// Get a specific subject
router.get('/:id', subjectController.getSubject);

// Update a subject
router.put('/:id', subjectController.updateSubject);

// Delete a subject
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
