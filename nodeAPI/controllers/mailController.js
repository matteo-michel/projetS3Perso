const nodemailer = require("nodemailer");

const requestRegisterMail = async (req, res) => {
    console.log("req redirect");
    if (!req.auth) return res.status(401).send();
    const targetEmail = 'ghast.jv@gmail.com';
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

