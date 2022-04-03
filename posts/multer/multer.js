const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
