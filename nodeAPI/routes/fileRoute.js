module.exports = app => {
    const parser = require("../controllers/parseController");
    const controller = require("../controllers/fileController");
    const auth = require("../middleware/auth");

    app.post("/api/parse", function (req, res) {
        if(!req.auth) return res.status(401).send();
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
            controller.parse(req, res, "golomb" + arg +".txt");
        });
    });
    app.post("/api/upload", controller.upload);
    app.post("/api/files", controller.getListFiles);


};
