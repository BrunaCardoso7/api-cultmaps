import Usuario from '../model/usuario.js'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken';
import userService from '../services/user.service.js'
import dotenv from 'dotenv'
dotenv.config()
// const validations = require('../validations/validation')


export const create = async (req, res, next)=>{
    try {
        const {nome, email, password, passwordConfirm} = req.body

        if(!nome || !email || !password || !passwordConfirm){
            res.status(400).send("preencha todos os campos")
        }
    
        if(password !== passwordConfirm){
            res.status(400).send("passwords not comfirm")
        }

        const user = await userService.createService(req.body)

        if(!user){
            return res.status(500).send({msg:"error creating user"})
        }

        res.status(200).send({
            msg:"created",
            user:{
                id: user._id,
                nome,
                email
            }
        })
        return next()
    } catch (error) {
        return res.status(500).json({msg: "Error: "+error})
    }
}

export const findAll = async(req, res)=>{
    try {
        const users = await userService.findAllService()
    
        if(users.length === 0){
            return res.status(400).send({msg:"There are no registered users"})
        }
        res.send(users)
    } catch (error) {
        res.status(500).send("error created:"+error)
    }
}


export const findById = async(req, res)=>{
    try {        
        const user = req.user
        res.send(user)
    } catch (error) {
        res.status(500).send("error findbyid:"+error)
    }
}

export const update = async(req, res)=>{
    try {     
        const {nome, email, password, passwordConfirm} = req.body
    
        if(!nome && !email && !password && !passwordConfirm){
            res.status(400).send("preencha todos os campos")
        }
    
        const { id, user } = req
    
        await userService.updateService(
            id,
            nome, 
            email, 
            password,
            passwordConfirm
        )
        res.send({msg:"user sucessfully updated"})
    } catch (error) {
        res.status(500).send("error update:"+error)
    }
}
