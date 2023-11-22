import mongoose from 'mongoose'
import userService from '../services/user.service.js'


export const validId = async(req, res, next)=>{

    let idParam;
    if (!req.params.id) {
        req.params.id = req.userId;
        idParam = req.params.id;
    } else {
        idParam = req.params.id;
    }

    if (!mongoose.Types.ObjectId.isValid(idParam)) {
        return res.status(400).send({ message: "Invalid id!" });
    }
    next();
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
