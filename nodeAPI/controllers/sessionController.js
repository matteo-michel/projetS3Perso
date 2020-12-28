const Session = require("../models/SessionModel");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Session.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
    Session.getById(req.params.id,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else res.send(data);
    });
};

exports.findByLogin = (req, res) => {
    Session.getByLogin(req.params.login,(err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else res.send(data);
    });
};

exports.findAllWithoutRegistered = (req, res) => {
    Session.getAllWithoutRegister(req.params.login,(err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else res.send(data);
    });
};

exports.removeByLogin = (req, res) => {
    if(!req.auth) return res.status(401).send();
    Session.removeByLogin(req.auth.login,req.body.id,(err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else res.send();

    });
};

exports.addToSession = (req, res) => {
    if(!req.auth) return res.status(401).send();
    console.log(req.auth)
    Session.addToSession(req.auth.login,req.body.id,(err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else res.send();
    });
};

exports.addSession = (req, res) => {
    Session.addSession(req.body.enonce, req.body.deadline, req.body.nomSession,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            }); else {
            res.status(200).send({
                message: "Session ajoute avec succes"
            });
        }
    });
}


