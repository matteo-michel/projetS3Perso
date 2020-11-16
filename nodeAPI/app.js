const express = require('express')
const app = express()
const cors = require('cors');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

require("./routes/bookRoute")(app);

const bodyParser = require('body-parser')
app.use(bodyParser.json())


module.exports = app
