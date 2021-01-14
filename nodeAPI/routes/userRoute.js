module.exports = app => {
    const user = require("../controllers/UserController.js");
    const mailer = require("../controllers/mailController");
      
    app.get("/api/users", user.findAll);

    app.get("/api/user/:login", user.findByLogin);

    app.post("/api/users/login", user.checkLogin);

    app.post("/api/users/register", user.register);

    app.post("/api/user/admin", user.isAdmin);

    app.post("/api/user/accept", user.isAccept);

    app.post("/api/user/setAccept", user.setAccept);

    app.post("/api/user/remove", user.remove);

    app.post("/api/user/promote", user.promote);

    app.post("/api/user/demote", user.demote);

    app.post("/api/registerMail", mailer.requestRegisterMail);

    app.post("/api/acceptMail", mailer.sendAcceptMail)

    app.post("/api/refuseMail", mailer.sendRefuseMail)

};
