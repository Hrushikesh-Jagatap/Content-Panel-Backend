const express = require('express');

const router = express.Router();

const examRouter = require('./examRoute');
const chapterRouter = require('./chapter');
const subjectRouter = require('./subject');
const questionRouter = require('./question');
const topicRouter = require('./topic');
const subTopicRouter = require('./subTopic');
const notesRouter = require('./notes');
const reportRouter = require('./report');
const generateQuestion = require('./generateQuestion');
const getRandomQuestion = require('./getRandomQuestion');



router.use('/random', getRandomQuestion);
router.use('/generateQuestion', generateQuestion);
router.use('/exam', examRouter);
router.use('/chapter', chapterRouter);
router.use('/subject', subjectRouter);
router.use('/question', questionRouter);
router.use('/topic', topicRouter);
router.use('/subTopic', subTopicRouter);
router.use('/notes', notesRouter);
router.use('/report',  reportRouter);


module.exports = router;
