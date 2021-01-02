const mysql = require('./Model');

const Session = function (session) {
    this.idSession = session.idSession;
    this.enonce = session.enonce;
    this.deadline = session.deadline;
    this.nomSession = session.nomSession;
}

Session.getAll = result => {
    mysql.query("SELECT * FROM session", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("Books: ", res);
        result(null, res);
    });
};

Session.getById = (p_id, result) => {
    mysql.query(`SELECT * FROM session WHERE idSession = "${p_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("Books: ", res);
        result(null, res);
    });
};

Session.getByLoginActual = (p_login,p_date, result) => {
    mysql.query(`SELECT * FROM session s
                JOIN participe p ON p.idSession = s.idSession
                WHERE p.login = "${p_login}" AND deadline > "${p_date}"`,
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);

    });
};

Session.getByLoginOld = (p_login,p_date, result) => {
    mysql.query(`SELECT * FROM session s
                JOIN participe p ON p.idSession = s.idSession
                WHERE p.login = "${p_login}" AND deadline <= "${p_date}"`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res);

        });
};

Session.getAllWithoutRegister = (p_login,p_date, result) => {
    mysql.query(`SELECT * FROM session
                WHERE idSession
                NOT IN(
                SELECT s.idSession FROM session s
                JOIN participe p ON p.idSession = s.idSession
                WHERE p.login = "${p_login}") AND deadline > "${p_date}";`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res);

            // not found Customer with the id
        });
};

Session.removeByLogin = (p_login, p_idSession, result) => {
    mysql.query(`DELETE FROM participe
                WHERE login = "${p_login}"
                AND idSession = "${p_idSession}"`,
        (err) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            // not found Customer with the id
            result(null, null);
        });
};

Session.addToSession = (p_login, p_idSession, result) => {
    mysql.query(`INSERT INTO participe VALUES ("${p_login}","${p_idSession}")`,
        (err) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            // not found Customer with the id
            result(null, null);
        });
};


Session.addSession = (p_enonce, p_deadline,p_nomSession,result) => {
    mysql.query(`INSERT INTO session VALUES (0,"${p_enonce}","${p_deadline}","${p_nomSession}")`,
        (err) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, null);
        });
};

Session.getByIdAndOutdated = (p_id,p_date, result) => {
    mysql.query(`SELECT * FROM session WHERE idSession = "${p_id}" AND deadline <= "${p_date}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("Books: ", res);
        result(null, res);
    });
};

module.exports = Session;
