const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PictureSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    data:{
        type: Date,
        required: true,
        set: (value)=>{
            if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
                return new Date(value);
            }
            return value;
        }
    }, 
    categoria:{
        type: String,
        required: true
    },
    localizacao:{
        type: String, 
        required: true,
    },
    name:{
        type:String,
        require: true
    },src:{
        type:String,
        require: true
    },
    usuario_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})
    

module.exports = mongoose.model("Picture", PictureSchema)  