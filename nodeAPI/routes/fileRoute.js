module.exports = app => {
    const parser = require("../controllers/parseController");
    // Retrieve all Customers
    app.get("/api/parse", function (req, res) {
        const { exec } = require("child_process");
        const filename = "Golomb.jar";
        exec("java -jar ./jar/" + filename +  " -m 4", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            parser.parse(req, res, "golomb4.txt");
        });
    });


};
