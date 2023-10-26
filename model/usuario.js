const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    passwordConfirm:{
        type: String,
        require: true
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports = Usuario