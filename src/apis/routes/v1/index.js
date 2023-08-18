const express = require('express');

const router = express.Router();

const examRouter = require('./examRoute');
const chapterRouter = require('./chapter');
const subjectRouter = require('./subject');



router.use('/exam', examRouter);
router.use('/chapter', chapterRouter);
router.use('/subject', subjectRouter);


module.exports = router;
