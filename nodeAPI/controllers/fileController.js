const uploadFile = require("../middleware/upload");
const Files = require("../models/FileModel");
const readline = require('readline');
const fs = require("fs");

let data = {};
var number;
var match;

const upload = async (req, res) => {
    try {
        if(!req.auth) return res.status(401).send();
        await uploadFile(req, res);

        if (req.file === undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        const filePath = "session" + req.body.idSession + '/' + req.file.filename;
        Files.addFile(req.file.originalname, filePath, '', req.auth.login, req.body.idSession,(err, data) => {
            if (err)
                res.status(403).send({
                    message:
                        err.message || "Some error occurred."
                }); else {
                res.status(200).send({
                    message: "Tout va bien"
                });
            }
        });

        parse(req, res);
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

const parse = (req, res) => {
    if(!req.auth) return res.status(401).send();
    const filePath = "session" + req.body.idSession + '/' + req.file.filename;
    const { exec } = require("child_process");
    const filename = "Golomb.jar";
    const arg = 4;

    exec("java -jar ./jar/" + filename +  " -m " + arg, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        //console.log(`stdout: ${stdout}`);
        const fileTxt = "golomb" + arg +".txt";
        const readInterface = readline.createInterface({
            input: fs.createReadStream(fileTxt),
            console: false
        });

        readInterface.on('line',  function (line){
            const array =['Solutions','Fails','Resolution time','Building time','Nodes'];
            line = line.replace('�','');

            if(line.startsWith("Nodes",1)) {
                const buffer = line.replace( /[^((\d)|(,))]/g, '');
                number = buffer.replace(/\D.*/g, '')
                match = "Nodes";
            } else {
                match = array.filter(obj => line.startsWith(obj,1));
                number = line.replace( /[^((\d)|(,))]/g, '');
            }
            if(match.length > 0) {
                data[match] = number;
            }

        }).on('close', () => {
            //console.log(data)
            res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
            });
            //res.send(data);
            Files.setPerformance(filePath, JSON.stringify(data));
            readInterface.close();
            data = {};
            fs.unlinkSync(fileTxt);
        });
    });


}


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
const addFile = (req, res) => {
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
    parse
};
