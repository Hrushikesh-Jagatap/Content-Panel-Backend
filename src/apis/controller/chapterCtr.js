const Chapter = require('../model/chapterModel');

exports.createChapter = async (req, res) => {
  try {
    const { chapterName, chapterDescription, thumbnail, examId, subjectId } = req.body;

    const newChapter = await Chapter.create({
      chapterName,
      chapterDescription,
      thumbnail,
      exam: examId,
      subject: subjectId
    });

    res.status(201).json({ success: true, data: newChapter });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add more controller functions as needed
