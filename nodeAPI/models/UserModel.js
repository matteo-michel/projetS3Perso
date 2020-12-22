const mysql = require('./Model');

const User = function (user) {
    this.login = user.login;
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.password = user.password;
}

User.getAll = result => {
    mysql.query("SELECT * FROM utilisateur", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("Books: ", res);
        result(null, res);
    });
};

User.findByLogin = (p_login, result) => {
    mysql.query(`SELECT * FROM utilisateur WHERE login = "${p_login}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

User.checkLogin = (p_login, p_pwd, result) => {
    mysql.query(`SELECT * FROM utilisateur WHERE login = "${p_login}" AND password = "${p_pwd}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

User.register = (p_login,p_nom, p_prenom, p_pwd, result) => {
    mysql.query(`INSERT INTO utilisateur VALUES ("${p_login}", "${p_nom}", "${p_prenom}", "${p_pwd}", 0)`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

module.exports = User;


