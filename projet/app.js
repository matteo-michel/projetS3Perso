const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

require("./routes/bookRoute")(app);

const bodyParser = require('body-parser')
app.use(bodyParser.json())


module.exports = app
