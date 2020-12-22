module.exports = app => {
    const user = require("../controllers/UserController.js");

    // Retrieve all Customers
    app.post("/api/parse", function (req, res) {
        res.send('Wiki home page');
      });
      
    app.get("/api/users", user.findAll);

    app.get("/api/users/:login", user.findByLogin);

    app.post("/api/users/login", user.checkLogin);

    app.post("/api/users/register", user.register);

    //console.log("test");
};
