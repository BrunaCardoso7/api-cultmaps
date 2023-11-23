import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const usuarioSchema = new mongoose.Schema({
    perfil:{
        src: {
            type: String,
            required: true
          }
    },
    background:{
        src: {
            type: String,
            required: true
          }
    },
    nome:{
        type: String,
        required: true
    },
    usuario:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    }
})

usuarioSchema.pre("save", async function (next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario