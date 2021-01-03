module.exports = app => {
    const controller = require("../controllers/fileController");
    const auth = require("../middleware/auth");

    app.post("/api/upload", controller.upload);
    app.post("/api/files", controller.getListFiles);
    app.post("/api/files/sessions", controller.getAllFiles);
    app.post("/api/files/sessions/login", controller.getFileLogin);
    app.post("/api/files/delete", controller.deleteFile);
    app.post("/api/files/download", controller.download);
    app.post("/api/files/canUpload", controller.canUpload);

};
