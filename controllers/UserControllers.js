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
        const avatar = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAP1BMVEX///+ZmZmWlpaenp67u7uTk5P7+/uQkJDw8PD39/e/v7+4uLjj4+PJycmmpqaioqLq6uqwsLDc3NzPz8/V1dU6g2sDAAAEO0lEQVR4nO2b3XKjMAyF1zL+N2Ab3v9Z16RN2rQQDBxIL3ymnZ3Zi8wXSZYlWf33r6qqqqqqakZSB+998j5o826WD5mxiT1nxCj/MNZHN4Q3EyXbCSUyzJdIKNW7Ub8JSYa2o2eih4TgNr3BmdI7toB0B4vj1Vw+8ldIH76kbriSyVhaZfqIsegvgxrX7fTF1V7jRtOqYqgs1V1xHEMnNjBN5uLnR1fiG6FuXjwbim3x3l3CnQo17oLKwdWcCJVe5s03WcvvRLphnRVbYaf7TsWSW1PCs0icUuA0h6AyVn9COk3qGNQpEa/L775FqRFNZY9DMerAN7UHQGUfWixVA6FiHBrwR/Lnd2GTljuYFe6CZodwOCvchTRWCzLVdAxhUKbHxPokAWsvPMyByOSAivWbelQm7XAOzMYClQ4BCcUU6BQmKBVFDBXiYv4mLhFQ0mGpCJLeDTTYMxUkY+keCsUIUvsFLBQjyCFEVTFYqoSmgtw52HSVqSAzh/FPUsFthfEgFgpE9TfPYOBgKsiYFH7jJASVjFgqTNknQX3zQ5gSecBWfaDeCzP5uEuBmhyDhGIK1RBGZOeFKUWzBmCXShFStmdpHBQTuCkksp/ADSETLLCQc2QJG8pgrptPjSBjCYeK9UkadEMLpKlQxkLNGO6SGGOh9wgQFSn+MU4eH/gRMFc9sA5nB2hWuMsfNBZqyPdD46FLWoDP30NHXlPptMUUaXdjnfK8+ymzt/4jfubGk2l2xRbxkxcQ4w4s0Z++Fblt++oGhX5untOGTbVJRPaSbTUdy7b6Pg11RkafkxlLV8OImgvXWbWlAq5LVyBv8o1Y4aLsvOvXa0PLl5fESLF4akAZPS74waTI2e/Ip/xfsV2KJ50A2+ahjaRoMQvq1MaekxBi+p3+YX1sxuWsKaOi2IZDrY53Ny+9vPClDmlobeNcY9t29C9NcbvgSXC3/xhoyz4jmuK61WXJ97+/gApmd6aM9K0mFg5ynIavc0v9rtPQPp0wgZjwPO2Q7Fm5le5HcaAKnLgG9fMjt/b3v6CmG+3Y5TFTyW7EknPv8nToog1zDSXZLVjD7G1CbP9jh59vJ8WGT/RLTzclGWJO0i7t5ZYX9Gb5jUTsOs9huQsp/56vZsakmq1FuH5ZVKtCH64sgQk+bDmMJvUvSx4qXH2aD/XvH1TOpcdubSe+MODXhy9EXVviRz106yV+2XNT2cKjoLjyF2YmuaU/A3uWKvmCpQuPUz2yCKZT86JS/fEFC+5D2ZV91g1Mid6NPphHFSOlCX5sOrGll+3WE7ze9vidS1DiXXQ2V3yttS52U2W6rb0u2E7eNZalTKKUyjh7xpQFG1noBZQSqvV3sPYNVOvhDt4tLKJaf4pG7wmUUK1vGVWqSlWpKlWlqlSVqlJVqkpVqSpVpapUlapSVapKVam2UlnGrxb7NYH8D8V7RJYfb+gXAAAAAElFTkSuQmCC`
        const background = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa_IcXMqekLOf7_JxSXJz735nDKiv5W6tj9g&usqp=CAU`
        const {nome, usuario, email, password} = req.body

        if(!nome|| !usuario || !email || !password){
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
                usuario,
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
