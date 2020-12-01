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
    Session.removeByLogin(req.params.login,req.params.idSession,(err, data) => {
        if (err) {

            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else res.send();

    });
};

exports.addToSession = (req, res) => {
    Session.addToSession(req.params.login,req.params.idSession,(err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else res.send();
    });
};


