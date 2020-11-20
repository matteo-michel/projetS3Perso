module.exports = app => {
    const user = require("../controllers/UserController.js");

    // Retrieve all Customers
    app.get("/api/users", user.findAll);

    app.get("/api/users/:login", user.findByLogin);

    app.post("/api/users/login", user.checkLogin);
};
