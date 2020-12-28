const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/tokenConfig');
const {verify} = require("jsonwebtoken");
const passwordHash = require('password-hash');


// Retrieve all Customers from the database.
function print(){

    console.log("hello")
}



exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else {  
            res.send(data); 
 
        }
    });
};

exports.findByLogin = (req, res) => {
    User.findByLogin(req.params.login,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

exports.register = (req, res) => {
    User.register(req.body.login, req.body.nom, req.body.prenom, req.body.pwd,(err, data) => {
        if (err)
            res.status(403).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            }); else {
            res.status(200).send({
                message: "Tout va bien"
            });
        }
    });
};

exports.checkLogin = (req, res) => {
    User.checkLogin(req.body.login,req.body.pwd,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else if (data.length !== 0 && passwordHash.verify(req.body.pwd, data[0]['password'])) {
            const token = jwt.sign(
                { login: data[0].login, role: data[0].admin},
                jwtConfig.secret_key
            );
            res.status(200).json({
                token
            });
        } else {
            res.status(403).send({
                message: "Le login ou le mot de passe est incorrect !"
            });
        }
    });
};

exports.isAdmin = (req, res) => {
    if(!req.auth) return res.status(401).send();
    User.isAdmin(req.auth.login,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else res.send(data[0]);
    });
};
