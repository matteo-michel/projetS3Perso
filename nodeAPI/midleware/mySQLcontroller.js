const mysql = require("mysql")

const connection = mysql.createConnection({
    host : 'webinfo.iutmontp.univ-montp2.fr',
    user : 'michelm',
    password : 'password',
    database : 'michelm'
});

connection.connect();

