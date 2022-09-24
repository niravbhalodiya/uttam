const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        // console.log(file.originalname);
        cb(null, + Date.now() + ext);
    }
});

var upload = multer({

    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    limits: {
        fileSize: 100000,
    }
},)


module.exports = upload;