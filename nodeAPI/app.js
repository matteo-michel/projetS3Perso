const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();

});

app.use(bodyParser.json())
require("./routes/userRoute")(app);
require("./routes/sessionRoute")(app);


module.exports = app
