module.exports = app => {
    const session = require("../controllers/sessionController");

    // Retrieve all Customers
    app.get("/api/sessions", session.findAll);

    app.get("/api/sessions/available/:login", session.findAllWithoutRegistered);

    app.get("/api/sessions/:login", session.findByLogin);

    app.get("/api/session/:id", session.getById);

    app.get("/api/sessions/quit/:login&:idSession", session.removeByLogin);

    app.get("/api/sessions/join/:login&:idSession", session.addToSession);

    app.post("/api/sessions/addSession", session.addSession);

};
