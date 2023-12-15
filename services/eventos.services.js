import { raw } from "express";
import evento from "../model/evento.js";

export const createService = (body)=>  evento.create(body)
export const findAllService = (offset, limit)=>  evento.find().sort({_id: -1}).skip(offset).limit(limit).populate("userId")
export const countEvents = ()=> evento.countDocuments()
export const topEventsService = () => evento.findOne().sort({_id: -1}).populate("userId")
export const findByIdEvetnService = (id)=> evento.findById(id).populate("userId")
export const findByTitleService = (title) => {
    return evento.find({
        nome: { $regex: new RegExp(title, 'i') }
    }).sort({ _id: -1 }).populate("userId");
};
export const updateService = (id, nome, descricao, data, categoria, localizacao, image)=> evento.findOneAndUpdate({_id: id}, {nome, descricao, data, categoria, localizacao, image}, {rawResult: true})
export const deleteService = (id)=> evento.findByIdAndDelete({_id: id})
export const likeEventService = (idPost, userId) => evento.findByIdAndUpdate({_id: idPost, "like.userId":{nin: [userId]}},{$push: {like: {userId, created: new Date()}}}) 
export const deleteLikeEventService = (idPost, userId)=> evento.findByIdAndUpdate({_id: idPost}, {$push: {like: {userId}}}) 
export const byUserService = (id)=> evento.find({usuario_id: id}).sort({_id: -1}).populate("userId")
export const addCommentService = (idPost, comment, userId)=> {
    const idComment = Math.floor(Date.now()*Math.random()).toString(36)
    return evento.findOneAndUpdate({_id: idPost}, {$push: {comentario: {idComment, userId, comment, createdAt: new Date()}}})
}
export const deleteCommentService = (idPost, idComment, userid)=> evento.findOneAndUpdate({_id: idPost}, {$pull: {comentario:{idComment, userid}}})