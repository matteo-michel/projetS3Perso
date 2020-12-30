const mysql = require('./Model');

const Files = function (file) {
    this.idFile = file.idFile;
    this.nom = file.nom;
    this.path = file.path;
    this.performances = file.performances;
}

Files.addFile = (p_nom,p_file,p_performances,p_login,p_idSession, result) => {
    try {
        mysql.query(`INSERT INTO fichier VALUES (0,"${p_nom}","${p_file}","${p_performances}")`,
            (err) => {
                if (err) {
                    //console.log("error: ", err);
                    return;
                }
            });
        mysql.query(`INSERT INTO depot VALUES ((SELECT idFile FROM fichier WHERE file = "${p_file}"),"${p_login}")`,
            (err) => {
                if (err) {
                    //console.log("error: ", err);
                    return;
                }
            });
        mysql.query(`INSERT INTO rendu VALUES ((SELECT idFile FROM fichier WHERE file = "${p_file}"),"${p_idSession}")`,
            (err) => {
                if (err) {
                    //console.log("error: ", err);
                    return;
                }
            });
    } catch (err) {}
};

Files.setPerformance = (p_file, p_performance) => {
    mysql.query(`UPDATE fichier SET performances = '${p_performance}' WHERE file = "${p_file}"`,
        (err) => {
            if (err) {
                console.log("error: ", err);
                return;
            }
    });
}

Files.getFileByPath = (p_file, result) => {
    mysql.query(`SELECT idFile FROM fichier WHERE file = "${p_file}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}


module.exports = Files ;
