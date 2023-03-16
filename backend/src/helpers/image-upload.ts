import multer from "multer";
import path from "path";

// Destination to store the images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("user")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }

    cb(null, `src/public/images/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Por favor, envie apenas jpg ou png"));
    }
    cb(null, true);
  },
});

export default imageUpload;
