const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/tokenConfig');


// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
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

exports.checkLogin = (req, res) => {
    User.checkLogin(req.body.login,req.body.pwd,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else if (data.length !== 0) {
            res.status(200).json({
                token: jwt.sign(
                    { login: req.body.login},
                    jwtConfig.password,
                    { expiresIn: '24h' }
                )
            });
            //res.send(data);
        } else {
            res.status(403).send({
                message: "Mauvais mot de passe"
            });
        }
    });
};
