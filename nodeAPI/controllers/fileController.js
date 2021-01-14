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
    const arg = req.body.argument.replace(/\D*/g, '');
    console.log(arg);

    exec("java -jar ./jar/" + filePath + " " + req.body.argument + "", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return res.status(500).send();
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return res.status(500).send();
        }

        const fileTxt = req.file.originalname.replace(/.jar$/g, arg +'.txt').toLowerCase();
        if(!fs.existsSync(fileTxt)) {
            fs.unlinkSync(__basedir + "/jar/" + filePath);
            req.body.fileName = req.file.filename;
            deleteFile(req, res);
            return res.status(500).send();
        }
        const readInterface = readline.createInterface({
            input: fs.createReadStream(__basedir + '/' +  fileTxt),
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

const getAllFiles = (req, res) => {
    Files.getAll(req.body.idSession, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else {
            res.send(data);

        }
    });
}

const getFileLogin = (req, res) => {
    if (!req.auth) return res.status(401).send();
    Files.getAllLogin(req.body.idSession, req.auth.login, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else {
            res.send(data);
        }
    });
}


const getListFiles = (req, res) => {
    if (!req.auth) return res.status(401).send();
    const directoryPath = __basedir + "/jar/session" + req.body.idSession;
    const loginUser = req.auth.login;
    let unprocessedData = [];
    let fileInfos = [];
    Files.isAdmin(req.auth.login, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else {
            if (data[0].admin === 1) {
                Files.getFileBySession(req.body.idSession, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred."
                        });
                    else {
                        unprocessedData = data;
                        unprocessedData.forEach((currentFile) => {
                            let file = currentFile.file.replace(/^session\d+\//g, '');
                            fileInfos.push({
                                name: file,
                                url: directoryPath + file,
                            });
                        });
                        res.status(200).send(fileInfos);
                    }
                });
            } else {
                Files.getFileBySessionLogin(req.body.idSession, loginUser, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred."
                        });
                    else {
                        unprocessedData = data;
                        unprocessedData.forEach((currentFile) => {
                            let file = currentFile.file.replace(/^session\d+\//g, '');
                            fileInfos.push({
                                name: file,
                                url: directoryPath + file,
                            });
                        });
                        res.status(200).send(fileInfos);
                    }
                });
            }
        }
    });
}


const download = (req, res) => {
    const directoryPath = __basedir + "/jar/";
    const filePath = 'session' + req.body.idSession +'/' + req.body.fileName;
    res.sendFile(directoryPath + filePath, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};
const deleteFile = (req, res) => {
    if(!req.auth) return res.status(401).send();
    const filePath = 'session' + req.body.idSession +'/' + req.body.fileName;
    Files.deleteFile(filePath,(err) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else {
            res.status(201).send;
        }
    });
    if(fs.existsSync(__basedir + '/jar/' + filePath)) {
        fs.unlinkSync(__basedir + '/jar/' + filePath);
    }
};

const canUpload = (req,res) => {
    if(!req.auth) return res.status(401).send();
    Files.canUpload(req.body.idSession,req.auth.login,(err,data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else {
            res.send(data);
        }
    });
};


module.exports = {
    upload,
    getListFiles,
    download,
    parse,
    getAllFiles,
    deleteFile,
    canUpload,
    getFileLogin
};
