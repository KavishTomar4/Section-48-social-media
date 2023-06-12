const { Binary } = require('mongodb')
let mongoose = require('mongoose')

let userSchema = mongoose.Schema({

    username:{
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    }

})

module.exports = mongoose.model('User', userSchema)