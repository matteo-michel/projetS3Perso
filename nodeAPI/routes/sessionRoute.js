module.exports = app => {
    const session = require("../controllers/sessionController");
    const auth = require("../middleware/auth");

    // Retrieve all Customers
    app.get("/api/sessions", session.findAll);

    app.get("/api/session/:id", session.getById);

    app.post("/api/sessions/quit", session.removeByLogin);

    app.post("/api/sessions/join", session.addToSession);

    app.post("/api/sessions/addSession", session.addSession);

    app.post("/api/sessions/modifySession", session.modifySession);

    app.post("/api/sessions/actual", session.findByLoginActual);

    app.post("/api/sessions/outdated", session.findByLoginOld);

    app.post("/api/sessions/available", session.findAllWithoutRegistered);

    app.post("/api/sessions/checkDate", session.isOutdated);

    app.post("/api/sessions/manage/enabled", session.findEnabled);

    app.post("/api/sessions/manage/disabled", session.findDisabled);

};
