const util = require("util");
const multer = require("multer");
const path = require('path');
const maxSize = 10 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/jar/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) === '.jar') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Le format accepté est uniquement le .jar !'));
        }
    }
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
