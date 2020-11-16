module.exports = app => {
    const book = require("../controllers/bookController.js");

    // Retrieve all Customers
    app.get("/api/books", book.findAll);
};
