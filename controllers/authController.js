import bcrypt from 'bcrypt'
import {loginService, generateToken } from '../services/auth.service.js'

export const login = async(req, res)=>{
    try {
        const { email, password } = req.body
    
        const user = await loginService(email)
    
        if(!user){
            return res.status(404).send({msg: "user is not found"})
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        
        if(!passwordIsValid){
            return res.status(400).send({msg: "password is not valid"})
        }

        const token = generateToken(user.id)

        res.send({token})
    } catch (error) {
        res.status(500).send({msg:"error: "+ error})
    }
}