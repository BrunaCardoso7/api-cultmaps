    import mongoose from 'mongoose'
    import bcrypt from 'bcrypt'
    const usuarioSchema = new mongoose.Schema({
        perfil:{
            src: {
                type: String,
                default: 'https://e1.pxfuel.com/desktop-wallpaper/601/246/desktop-wallpaper-bald-gojo-gojo-drip.jpg '
            }
        },
        background:{
            src: {
                type: String,
                default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa_IcXMqekLOf7_JxSXJz735nDKiv5W6tj9g&usqp=CAU'
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