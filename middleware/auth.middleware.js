import dotenv from 'dotenv'
import jwt  from 'jsonwebtoken'
import  { findByIdUserService } from '../services/user.service.js'
dotenv.config()

const secret = process.env.SECRET

export const authMiddleware = (req, res, next)=>{
    try {   
        const { authorization } = req.headers
    
        if(!authorization){
            return res.status(401).send("not unauthorized")
        }
    
        const parts = authorization.split(" ")
    
        if(parts.length !== 2){
            res.status(401).send("token invalid")
        }
    
        const [schema, token ] = parts
    
        if(schema !== "Bearer"){
            res.status(401).send("bearer invalid")
        }
    
        jwt.verify(token, secret, async(error, decoded)=>{
            if(error){
                res.status(500).send("error verify: " + error)
            }
            console.log(decoded)
            const user = await findByIdUserService(decoded.id)
            if(!user || !decoded.id){   
                res.status(401).send({msg: "usuerId not fount"})
            }
            req.userId = user._id
        })
        return next()
    } catch (error) {
        res.status(500).send(error)
    }

    next()
}