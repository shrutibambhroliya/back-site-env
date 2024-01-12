const mongoose = require('mongoose');
const mainSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: Number,
        required: false
    }
})
module.exports = mongoose.model("mains", mainSchema)