import Usuario from '../model/usuario.js'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken';
import {findByIdUserService,createService} from '../services/user.service.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config()
// const validations = require('../validations/validation')
import { generateToken } from '../services/auth.service.js';

export const create = async (req, res, next)=>{
    try {
        const {avatar, background, nome, email, password} = req.body

        if(!nome|| !email || !password){
            res.status(400).send("preencha todos os campos")
        }
    
        // if(password !== passwordConfirm){
        //     res.status(400).send("passwords not comfirm")
        // }

        const user = await createService(req.body)

        if(!user){
            return res.status(500).send({msg:"error creating user"})
        }
        const token = generateToken(user.id)

        res.status(200).send({
            msg:"created",
            token: token,
            user:{
                id: user._id,
                avatar,
                background,
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
  // Use req.query.id se presente, caso contrário, use req.params.id
  const userId = req.query.id || req.params.id;

  // Verifique se o userId é válido
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: "Invalid id!" });
  }

  // Chame a função findByIdUserService com o userId
  const user = await findByIdUserService(userId, req.userId);

  // Envie a resposta
  return res.send(user);
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
