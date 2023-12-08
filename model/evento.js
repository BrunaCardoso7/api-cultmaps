import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const EventosSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    data:{
        type: String,
        required: true,
        // set: (value)=>{
        //     if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        //         return new Date(value);
        //     }
        //     return value;
        // }
    }, 
    dataOpt:{
        type: String,
        required: true,
        // set: (value)=>{
        //     if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        //         return new Date(value);
        //     }
        //     return value;
        // }
    }, 
    categoria:{
        type: String,
        required: true
    },
    faixaEtaria:{
        type: String,
        required: true,
    },
    localizacao:{
        type: String, 
        required: true,
    },
    image: {    
        src: {
          type: String,
          required: true
        }
    },
    usuario_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    like:{
        type: Array,
        require: true
    },
    comentario:{
        type: Array,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})
    

export default mongoose.model("Eventos", EventosSchema)  