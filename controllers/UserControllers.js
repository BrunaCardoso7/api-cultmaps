const Usuario = require('../model/usuario')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require("jsonwebtoken");
const validations = require('../validations/validation')
const cookie = require('cookie')



exports.createUser = async (req, res, next)=>{
    try {
        const {nome, email, password, passwordConfirm} = req.body
        const validation = validations.validationDataRegister(nome, email, password, passwordConfirm)
        if(validation.length > 0){
            return res.status(422).json({errors: validation})
        }
        
        const  hashedPassaword = await bcrypt.hash(password, 10)
        
        const usuario = new Usuario({
            nome,
            email,
            password: hashedPassaword,
            passwordConfirm
        })
        await usuario.save()
        res.status(200).json({msg: "Wellcome to the CultMaps"})
        next()
    } catch (error) {
        res.status(200).json({msg: "Error login"+error})
    }
}

exports.login = async(req, res, next)=>{
    const {email, password} = req.body
    
    // const validation  = validations.validationDataLogin(email, senha)
    // if (validation.length > 0){
        //     return res.status(422).json({ errors: validation });
        // }
        
    const user = await Usuario.findOne({email: email})

    if(!user){
        return res.status(404).json({msg: "User not found"})
    }
    
    const checkPasswore = bcrypt.compare(password, user.password)
    
    if(!checkPasswore){
        res.status(422).json({msg: "password invalid"})
    }
    try {
        const secret = process.env.SECRET
        
        const  token = jwt.sign(
            {
                id: user._id,
            },
            secret,
            )
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
            sameSite: 'lax',
            secure: true,
        })
        // res.redirect('https://brunacardoso7.github.io/cultmaps/frontend/index.html')
        res.status(200).json({msg: "Authetication realized sucessfully", token})
        // res.redirect(`/logged/${user._id}`);
        next()
    } catch (error) {
        res.status(500).json({msg:"Athetications not completed, error: "+ error})
    }
}

exports.Logged = async(req, res)=>{
    const id = req.params.id

    const user = await Usuario.findById(id, "-password")

    if(!user){
        return res.status(404).json({msg: "User not found!"})
    }
    res.status(200).json({user, id})
}