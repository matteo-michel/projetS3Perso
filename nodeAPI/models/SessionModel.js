const mysql = require('./Model');

const Session = function (session) {
    this.idSession = session.idSession;
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

Session.findByLogin = (p_id, result) => {
    mysql.query(`SELECT * FROM session WHERE idSession = "${p_id}"`, (err, res) => {
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

module.exports = Session;
