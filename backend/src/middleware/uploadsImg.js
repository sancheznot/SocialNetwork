const multer = require("multer");
const path = require("path");

// config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.originalUrl === "/api/user/imgupload") {
      cb(null, path.join(__dirname, "../uploads/avatars/"));
    } else {
      cb(null, path.join(__dirname, "../uploads/publication/"));
    }
  },
  filename: (req, file, cb) => {
    if (req.originalUrl === "/api/user/imgupload") {
      cb(null, "avatars-" + Date.now() + "-" + file.originalname);
    } else {
      cb(null, "pub-" + Date.now() + "-" + file.originalname);
    }
  },
});
const uploads = multer({ storage });

module.exports = {
  uploads,
};
