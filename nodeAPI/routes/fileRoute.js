module.exports = app => {
    const controller = require("../controllers/fileController");
    const auth = require("../middleware/auth");

    app.post("/api/upload", controller.upload);
    app.post("/api/files", controller.getListFiles);
    app.post("/api/files/sessions", controller.getAllFiles);
    app.post("/api/files/delete", controller.deleteFile);

};
