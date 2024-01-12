const { parsed } = require('dotenv').config()

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(parsed.MONGODB)
    .then(() => {
        console.log("database connected..");
    }).catch((err) => {
        console.log(err);
    })