const mysql = require('./Model');

const Book = function (book) {
    this.isbn = book.isbn;
    this.titre = book.titre;
    this.numEditeur = book.numEditeur;
    this.prix = book.prix;
    this.dateParution = book.dateParution;
    this.resume = book.resume;
    this.stock = book.stock;
}

Book.getAll = result => {
    mysql.query("SELECT * FROM book", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Books: ", res);
        result(null, res);
    });
};

module.exports = Book;
