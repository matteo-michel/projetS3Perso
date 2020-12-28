const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const auth = require('./middleware/auth')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );

    next();
});


global.__basedir = __dirname;

const corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);

require("./routes/userRoute")(app);
require("./routes/sessionRoute")(app);
require("./routes/fileRoute")(app);


module.exports = app
