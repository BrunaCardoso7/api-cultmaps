const Usuario = require('../model/usuario')
const bcrypt = require('bcrypt')
exports.createUser = async (req, res)=>{
    try {
        const { password } = req.body
        const  hashedPassaword = await bcrypt.hash(password, 10)

        const usuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            password: hashedPassaword
        })
        await usuario.save()
        res.status(200).json({msg: "Wellcome to the CultMaps"})
    } catch (error) {
        res.status(200).json({msg: "Error login"+error})
    }
}