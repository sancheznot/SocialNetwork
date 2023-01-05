const multer = require("multer");
const path = require("path");

// config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/avatars/"));
  },  
  filename: (req, file, cb) => {
    cb(null, "avatars-" + Date.now() + "-" + file.originalname);
  },
});
const uploads = multer({ storage });

module.exports = {
  uploads,
};
