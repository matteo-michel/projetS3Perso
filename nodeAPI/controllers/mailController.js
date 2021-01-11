const nodemailer = require("nodemailer");
const Users = require('../models/UserModel');

var targetEmail;

const getAllAdminMail = (callback) => {
    Users.getAllAdminMail((err, data) => {
        const result = JSON.parse(JSON.stringify(data));
        let final = [];
        result.forEach((d) => {
            final.push(d.email);
        });
        final.join(',');
        callback(final.join(','));
    });
}

const requestRegisterMail = async (req, res) => {
    await getAllAdminMail((res) => {
        targetEmail = res;
        console.log(targetEmail);
    })
    console.log(targetEmail);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jp.mailn3.projet@gmail.com',
            pass: 'M40k41SuP#',
        },
    });

    let info = await transporter.sendMail({
        from: '"AngularProject" <jp.mailn3.projet@gmail.com>',
        to: targetEmail,
        subject: "Demande d'inscription !",
        text: "login " + req.body.login + ', email : ' + req.body.email,
        //html: "<h1>Utilisateur de login </h1>"
    },(err, success) => {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
    });

    return res.status(200).send();

}

module.exports = {
    requestRegisterMail,
};

