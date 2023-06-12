let mongoose = require('mongoose');

let serverSchema = new mongoose.Schema({

    img: {
        type: String,
        required: true
    },
    roomname: {
        type: String,
        required: true
    },
    users:[String]

})

module.exports = mongoose.model("servers", serverSchema);