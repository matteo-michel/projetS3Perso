const Session = require("../models/SessionModel");
const fs = require("fs");


const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.toLocaleTimeString();
const dateTime = date + ' ' + time;

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

exports.findByLoginActual = (req, res) => {
    Session.getByLoginActual(req.body.login,dateTime,(err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else res.send(data);
    });
};

exports.findByLoginOld = (req, res) => {
    Session.getByLoginOld(req.body.login,dateTime,(err, data) => {
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
    Session.getAllWithoutRegister(req.body.login,dateTime,(err, data) => {
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
    if (!req.auth) return res.status(401).send();
    //if(!req.auth.role !== 1) return res.status(403).send();
    Session.addSession(req.body.enonce, req.body.deadline, req.body.nomSession, req.body.argument, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else {
            res.status(200).send({
                message: "Session ajoute avec succes"
            });
        }
    });
}

exports.modifySession= (req, res) => {
    if (!req.auth) return res.status(401).send();
    //if(!req.auth.role !== 1) return res.status(403).send();
    Session.modifySession(req.body.idSession, req.body.enonce, req.body.deadline, req.body.nomSession, req.body.disabled, req.body.argument, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else {
            res.status(200).send({
                message: "Session ajoute avec succes"
            });
        }
    });
}

exports.isOutdated = (req, res) => {
    Session.getByIdAndOutdated(req.body.id,dateTime,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else res.send(data)
    });
}

exports.findEnabled = (req, res) => {
    if (req.body.type === 'active') {
        Session.getActiveEnabled(dateTime,(err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message:
                        err.message || "Some error occurred."
                });
            } else res.send(data);
        });
    }
    else {
        Session.getOldEnabled(dateTime,(err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message:
                        err.message || "Some error occurred."
                });
            } else res.send(data);
        });
    }
};

exports.findDisabled = (req, res) => {
    Session.getDisabled((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else res.send(data);
    });
};


