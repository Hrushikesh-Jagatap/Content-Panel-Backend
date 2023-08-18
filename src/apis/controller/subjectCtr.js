const Subject = require('../model/subjectModel');

exports.createSubject = async (req, res) => {
  try {
    const { subjectName, subjectDescription, thumbnail, examId } = req.body;

    const newSubject = await Subject.create({
      subjectName,
      subjectDescription,
      thumbnail,
      exam: examId // Linking the subject to the exam by using the exam's ObjectId
    });

    res.status(201).json({ success: true, data: newSubject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


