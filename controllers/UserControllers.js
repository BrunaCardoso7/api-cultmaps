const Usuario = require('../model/usuario')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require("jsonwebtoken");
const validations = require('../validations/validation')

exports.Logged = async(req, res)=>{
    const id = req.params.id

    const user = await Usuario.findById(id, "-password")

    if(!user){
        return res.status(404).json({msg: "User not found!"})
    }
    res.status(200).json({user})
}


exports.createUser = async (req, res)=>{
    try {
        const { password } = req.body
        const  hashedPassaword = await bcrypt.hash(password, 10)

        const usuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            password: hashedPassaword,
            passwordConfirm: req.body.passwordConfirm
        })
        await usuario.save()
        res.status(200).json({msg: "Wellcome to the CultMaps"})
    } catch (error) {
        res.status(200).json({msg: "Error login"+error})
    }
}

exports.login = async(req, res)=>{
    const {nome, email} = req.body

    validations.validationDataLogin(nome, email)

    const user = await Usuario.findOne({email: email})

    if(!user){
        return res.status(404).json({msg: "User not found"})
    }
    
    const checkPasswore = await bcrypt.compare(password, user.password)

    if(!checkPasswore){
        res.status(422).json({msg: "password invalid"})
    }
    try {
        const secret = process.env.SECRET

        const  token = jwt.sign(
            {
                id: user._id,
            },
            secret
        )
        res.status(200).json({msg: "Authetication realized sucessfully"})
    } catch (error) {
        res.status(500).json({msg:"Athetications not completed, error: "+ error})
    }
}