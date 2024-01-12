const express = require("express");
const app = express();

const { parsed } = require('dotenv').config()

const { json } = require("express");
app.use(json());

const cors = require("cors");
app.use(cors());

require('./app/db/database');

app.listen(parsed.PORT, () => {
    console.log("2300 port started");
});
app.use('/api', require('./app/Api'))