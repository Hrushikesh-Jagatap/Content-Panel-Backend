const express = require('express');

const router = express.Router();

const examRouter = require('./examRoute');
const chapterRouter = require('./chapter');
const subjectRouter = require('./subject');
const questionRouter = require('./question');
const topicRouter = require('./topic');
const subTopicRouter = require('./subject');


router.use('/exam', examRouter);
router.use('/chapter', chapterRouter);
router.use('/subject', subjectRouter);
router.use('/question', questionRouter);
router.use('/topic', topicRouter);
router.use('/sub-topic', subTopicRouter);

module.exports = router;