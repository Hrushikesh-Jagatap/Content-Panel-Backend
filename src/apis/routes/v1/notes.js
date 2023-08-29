// routes/notes.js
const express = require('express');
const router = express.Router();
const notesController = require('../../controller/notes');
const upload = require('../../services/notes/uploadFileMulter'); // Custom middleware to handle file upload
const authMiddleware = require("../../services/authMdlWr/authMiddleware"); //  this middleware

router.post('/createNotes',authMiddleware.authenticate, upload.single('file') , notesController.createNote);
router.get('/getAll', notesController.getAllNotes);
router.get('/get/:id', notesController.getNoteById);
router.put('/update/:id', notesController.updateNoteById);
router.delete('/delete/:id', notesController.deleteNoteById);

module.exports = router;
