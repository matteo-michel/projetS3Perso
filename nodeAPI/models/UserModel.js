const mysql = require('./Model');
var passwordHash = require('password-hash');

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

User.getAllAdminMail = (result) => {
     mysql.query("SELECT email FROM utilisateur WHERE admin = 1", (err, res) => {
        if (err) result(err, null);
        else result(null, res);
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
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

User.checkLogin = (p_login, p_pwd, result) => {
    mysql.query(`SELECT * FROM utilisateur WHERE login = "${p_login}" AND isAccept = 1`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

User.register = (p_login,p_nom, p_prenom, p_pwd, p_email,result) => {
    var hashedPassword = passwordHash.generate(p_pwd);
    mysql.query(`INSERT INTO utilisateur VALUES ("${p_login}", "${p_nom}", "${p_prenom}", "${hashedPassword}", 0,"${p_email}", 0)`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

User.isAdmin = (p_login, result) => {
    mysql.query(`SELECT admin FROM utilisateur WHERE login = "${p_login}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

User.isAccept = (p_login, result) => {
    mysql.query(`SELECT isAccept FROM utilisateur WHERE login = "${p_login}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

User.setAccept = (p_login, result) => {
    mysql.query(`UPDATE utilisateur SET isAccept = '1' WHERE login = "${p_login}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

User.promote = (p_login, result) => {
    mysql.query(`UPDATE utilisateur SET admin = '1' WHERE login = "${p_login}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

User.demote = (p_login, result) => {
    mysql.query(`UPDATE utilisateur SET admin = '0' WHERE login = "${p_login}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

User.remove = (p_login, result) => {
    mysql.query(`DELETE FROM utilisateur WHERE login = "${p_login}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

module.exports = User;




