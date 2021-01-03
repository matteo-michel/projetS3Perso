const mysql = require('./Model');

const Files = function (file) {
    this.idFile = file.idFile;
    this.nom = file.nom;
    this.path = file.path;
    this.performances = file.performances;
}

Files.getAll = (p_idSession,result) => {
    mysql.query('SELECT login,idSession,f.idFile, file, performances, nom FROM fichier f \n' +
                'JOIN rendu r ON r.idFile = f.idFile\n' +
                'JOIN depot d ON d.idFile = f.idFile\n' +
                `WHERE idSession = "${p_idSession}"`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            result(null, res);
        });
};

Files.getAllLogin = (p_idSession, p_login ,result) => {
    mysql.query('SELECT login,idSession,f.idFile, file, performances, nom FROM fichier f \n' +
        'JOIN rendu r ON r.idFile = f.idFile\n' +
        'JOIN depot d ON d.idFile = f.idFile\n' +
        `WHERE idSession = "${p_idSession}" AND login = "${p_login}"`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            result(null, res);
        });
};

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

Files.deleteFile = (p_file) => {
    mysql.query(`DELETE FROM fichier WHERE file = "${p_file}"`,
        (err) => {
            if (err) {
                console.log("error: ", err);
            }
        });
}

Files.getFileBySessionLogin = (p_idSession, p_login, result) => {
    mysql.query('SELECT file FROM fichier f \n' +
        'JOIN rendu r ON r.idFile = f.idFile\n' +
        'JOIN depot d ON d.idFile = f.idFile\n' +
        `WHERE idSession = "${p_idSession}" AND login = "${p_login}"`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            //console.log("Books: ", res);
            result(null, res);
        });
};
Files.getFileBySession = (p_idSession, result) => {
    mysql.query('SELECT file FROM fichier f \n' +
        'JOIN rendu r ON r.idFile = f.idFile\n' +
        'JOIN depot d ON d.idFile = f.idFile\n' +
        `WHERE idSession = "${p_idSession}"`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            //console.log("Books: ", res);
            result(null, res);
        });
};

Files.isAdmin = (p_login, result) => {
    mysql.query(`SELECT admin FROM utilisateur WHERE login = "${p_login}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

Files.canUpload = (p_idSession,p_login, result) => {
    mysql.query('SELECT file FROM fichier f \n' +
        'JOIN rendu r ON r.idFile = f.idFile\n' +
        'JOIN depot d ON d.idFile = f.idFile\n' +
        `WHERE idSession = "${p_idSession}" AND login = "${p_login}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}



module.exports = Files ;
