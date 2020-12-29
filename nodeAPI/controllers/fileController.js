const uploadFile = require("../middleware/upload");
const Files = require("../models/FileModel");
const fs = require("fs");

const upload = async (req, res) => {
    try {
        if(!req.auth) return res.status(401).send();
        await uploadFile(req, res);
        if (req.file === undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        req.mov
        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {

        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 10MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: . ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/jar/session" + req.body.idSession;

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: directoryPath + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/jar/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};
exports.addFile = (req, res) => {
    Files.addFile(req.body.nom, req.body.file, req.body.performances,req.body.login,req.body.idSession,(err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else {
            res.status(200).send({
                message: "Session ajoute avec succes"
            });
        }
    });
}

module.exports = {
    upload,
    getListFiles,
    download,
};
