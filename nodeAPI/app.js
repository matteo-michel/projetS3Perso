const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

global.__basedir = __dirname;

const corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(bodyParser.json())

require("./routes/userRoute")(app);
require("./routes/sessionRoute")(app);
require("./routes/fileRoute")(app);


module.exports = app
