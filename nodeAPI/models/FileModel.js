const mysql = require('./Model');

const Files = function (file) {
    this.idFile = file.idFile;
    this.nom = file.nom;
    this.path = file.path;
    this.performances = file.performances;
}

Files.addFile = (p_nom,p_file,p_performances,p_login,p_idSession, result) => {
    mysql.query(`INSERT INTO fichier VALUES (0,"${p_nom}","${p_file}","${p_performances}")`,
        (err) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, null);
        });
    const p_idFile = this.getIdByPath(p_file);
    mysql.query(`INSERT INTO depot VALUES ("${p_idFile}","${p_login}")`,
        (err) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, null);
        });
    mysql.query(`INSERT INTO rendu VALUES ("${p_idFile}","${p_idSession}")`,
        (err) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, null);
        });
};

Files.getIdByPath = (p_file, result) => {
    mysql.query(`SELECT idFile FROM fichier WHERE file = "${p_file}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("Books: ", res);
        result(null, res);
    });
};

module.exports = Files ;
