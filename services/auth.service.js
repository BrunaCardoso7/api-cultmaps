import user from '../model/usuario.js'
import jwt  from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.SECRET

export const loginService = (email)=> 
    user.findOne({email: email}).select("+password")
export const generateToken = (id)=> jwt.sign({id: id}, secret, {expiresIn: 86400})