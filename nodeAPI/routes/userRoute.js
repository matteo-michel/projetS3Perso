module.exports = app => {
    const user = require("../controllers/UserController.js");
      
    app.get("/api/users", user.findAll);

    app.get("/api/user/:login", user.findByLogin);

    app.post("/api/users/login", user.checkLogin);

    app.post("/api/users/register", user.register);

    app.post("/api/user/admin", user.isAdmin);

};
