module.exports = app => {
    const session = require("../controllers/sessionController");
    const auth = require("../middleware/auth");

    // Retrieve all Customers
    app.get("/api/sessions", session.findAll);

    app.get("/api/sessions/available/:login", session.findAllWithoutRegistered);

    app.get("/api/sessions/:login", session.findByLogin);

    app.get("/api/session/:id", session.getById);

    app.post("/api/sessions/quit/", session.removeByLogin);

    app.post("/api/sessions/join/", session.addToSession);

    app.post("/api/sessions/addSession", session.addSession);

};
