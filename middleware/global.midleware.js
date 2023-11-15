import mongoose from 'mongoose'
import userService from '../services/user.service.js'


export const validId = async(req, res, next)=>{

    const userId = req.params.id
    
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).send({msg:"inválid id"})
    }

    next()
}
export const validUser = async(req, res, next)=>{
    const userId = req.params.id
    
    const user = await userService.findByIdUserService(userId)

    if(!user){
        res.status(400).send({msg: "user not found"})
    }   

    req.id = userId
    req.user =  user
    next()
}
