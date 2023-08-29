const multer = require('multer');

// Define storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
