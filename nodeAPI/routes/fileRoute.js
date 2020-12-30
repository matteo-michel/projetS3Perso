module.exports = app => {
    const controller = require("../controllers/fileController");
    const auth = require("../middleware/auth");

    app.post("/api/upload", controller.upload);
    app.post("/api/files", controller.getListFiles);


};
