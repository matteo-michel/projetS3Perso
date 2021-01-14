const nodemailer = require("nodemailer");
const confiMail = require("../config/emailConfig");
const Users = require('../models/UserModel');

const mailUser = confiMail.user;
const mailPwd = confiMail.password;

const getAllAdminMail = (callback) => {
    Users.getAllAdminMail((err, res) => {
        if(err) callback('')
        const result = JSON.parse(JSON.stringify(res));
        let final = [];
        result.forEach((d) => {
            final.push(d.email);
        });
        callback(final.join(','))
    })
}

exports.requestRegisterMail = async (req, res) => {
    getAllAdminMail((targetEmail) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: mailUser,
                pass: mailPwd,
            },
        });

        const message = {
            from: '"AngularProject" <jp.mailn3.projet@gmail.com>',
            to: targetEmail,
            subject: "Demande d'inscription !",
            text: "login : " + req.body.login + ', email : ' + req.body.email + " nom : " + req.body.login + ', prénom : ' + req.body.prenom,
            //html: "<h1>Utilisateur de login </h1>"
        }

        let info = transporter.sendMail(
            message,
        (err, success) => {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }
        });

        return res.status(200).send();
    });
}

exports.sendAcceptMail = (req, res) => {
    if(!req.auth || req.auth.admin === 0) return res.status(401).send();
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mailUser,
            pass: mailPwd,
        },
    });

    const message = {
        from: '"AngularProject" <jp.mailn3.projet@gmail.com>',
        to: req.body.email,
        subject: "Vous avez été accepté !",
        text: "Félicitation, vous avez été accepté sur le Dahsboard. \nVous pouvez désormais vous connecter avec vos identifiants !",
        //html: "<h1>Utilisateur de login </h1>"
    }

    let info = transporter.sendMail(
        message,
        (err, success) => {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }
        });

    return res.status(200).send();
}

exports.sendRefuseMail = (req, res) => {
    if(!req.auth || req.auth.admin === 0) return res.status(401).send();
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mailUser,
            pass: mailPwd,
        },
    });

    const message = {
        from: '"AngularProject" <jp.mailn3.projet@gmail.com>',
        to: req.body.email,
        subject: "Vous avez été refusé !",
        text: "Désolé, vous avez été refusé sur le site, vos identifiants ne sont pas convenables !",
        //html: "<h1>Utilisateur de login </h1>"
    }

    let info = transporter.sendMail(
        message,
        (err, success) => {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }
        });

    return res.status(200).send();
}

// module.exports = {
//     requestRegisterMail,
//     sendAcceptMail,
//     sendRefuseMail,
// };

