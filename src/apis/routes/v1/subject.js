const express = require('express');
const subjectController = require('../../controller/subjectCtr');

const router = express.Router();

router.post('/', subjectController.createSubject);
//  more routes 

module.exports = router;
