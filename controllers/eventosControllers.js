import { createService, findAllService,countEvents, topEventsService, findByIdEvetnService, findByTitleService, byUserService, updateService, deleteService, likeEventService, deleteLikeEventService, addCommentService,deleteCommentService} from '../services/eventos.services.js'

export const create =  async(req, res)=>{
    try {
        const {nome, autor, descricao, dataOpt, faixaEtaria, patrocinadores, categoria, data, localizacao} = req.body
        const usuario_id = req.userId
        const {path: src} = req.file
        
        if(!nome|| !autor|| !descricao||!categoria|| !data|| !localizacao){
            res.status(400).send({msg: "inform camp all"})
        }

        const eventoData ={
            nome, 
            autor,
            dataOpt,
            faixaEtaria,
            patrocinadores,
            descricao, 
            categoria, 
            data, 
            localizacao,
            usuario_id,
            image: {
                src
            }
        }

        const evento = await createService(eventoData)
        
        return res.status(200).json({ msg: "Data saved successfully", evento });
    } catch (error) {
        console.log("Erro do servidor:", error);
        return res.status(500).json({ msg: "Error saving data " + error });
    }
};

export const getAll = async(req, res)=>{
    try {
        let { limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)

        if(!limit){
            limit = 100
        }
        if(!offset){
            offset = 0
        }

        const evento = await findAllService(offset, limit)
        const currentUrl = req.baseUrl
        
        const total = await countEvents()
        const next = offset + limit

        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${offset}` : null


        const previus = offset - limit < 0? null: offset-limit

        const previusUrl = previus !== null ? `${currentUrl}?limit=${limit}&offset=${previus}` : null

        if(evento.length === 0 ){
            return res.status(400).send({msg:"there not registered events"})
        }

        res.send({
            nextUrl,
            previusUrl,
            limit,
            offset,
            total,
    
            results: evento.map(e => ({
                id: e._id,
                nome: e.nome,
                author: e.author,
                descricao: e.descricao,
                data: e.data,
                categoria: e.categoria,
                localizacao: e.localizacao,
                like: e.like,
                comentario: e.comentario,
                // userName: e.usuario_id.nome,
                image: e.image.src
            }))
        })
    } catch (error) {
        res.status(404).json({msg: "event not found"+error})
    }
}
export const topEvents = async(req, res)=>{
    try {
        const eventos = await topEventsService()

        if(!eventos){
            res.status(400).send({msg:"event not registered"})
        }

        res.send({
            eventos: {
                id: eventos._id,
                nome: eventos.nome,
                author: eventos.author,
                descricao: eventos.descricao,
                data: eventos.data,
                categoria: eventos.categoria,
                localizacao: eventos.localizacao,
                like: eventos.like,
                comentario: eventos.comentario,
                userName: eventos.usuario_id.nome,
                image: eventos.image.src
            }
        })
    } catch (error) {
        res.status(404).json({msg: "event not found"+error})
    }
    
}
export const findById = async(req, res)=>{
    try {
        const { id } = req.params

        const event = await findByIdEvetnService(id)

        return res.send({
            eventos: {
                id: event._id,
                nome: event.nome,
                author: event.author,
                descricao: event.descricao,
                data: event.data,
                categoria: event.categoria,
                localizacao: event.localizacao,
                like: event.like,
                comentario: event.comentario,
                userName: event.usuario_id.nome,
                image: event.image.src
            }
        })
    } catch (error) {
        res.status(404).json({msg: "event not found"+error})
    }
}
export const searchByTitle = async(req, res)=>{
    try {
        const { title } = req.query
        const events =  await findByTitleService(title)

        if(events.length === 0){
           return res.status(400).send({msg:"none event registered with this title"})
        }   
        return res.send({
            results: events.map(e => ({
                id: e._id,
                nome: e.nome,
                author: e.author,
                descricao: e.descricao,
                data: e.data,
                categoria: e.categoria,
                localizacao: e.localizacao,
                like: e.like,
                comentario: e.comentario,
                userName: e.usuario_id.nome,
                image: e.image.src
            }))
        })
    } catch (error) {
        res.status(404).json({msg: "event not found"+error})
    }
    
}
export const byUser = async(req, res)=>{
    try {
        const id = req.userId
        const user = await byUserService(id)
        return res.send({
            results: user.map(u => ({
                id: u._id,
                nome: u.nome,
                author: u.author,
                descricao: u.descricao,
                data: u.data,
                categoria: u.categoria,
                localizacao: u.localizacao,
                like: u.like,
                comentario: u.comentario,
                userName: u.usuario_id.nome,
                image: u.image.src
            }))
        })
    } catch (error) {
        res.status(404).json({msg: "event not found"+error})
    }
}
export const update = async(req, res)=>{
    try {
        const {nome, descricao, data, categoria, localizacao, image} = req.body
        const { id } = req.params

        if(!nome|| !author|| !descricao||!categoria|| !data|| !localizacao || !image){
            res.status(400).send({msg: "inform camp all"})
        }

        const event = await findByIdEvetnService(id)

        if(String(event.usuario_id._id) !== req.userId){
            return res.status(400).send({msg: "you didn't update this post"})
        }

        await updateService(id, nome, descricao, data, categoria, localizacao, image)
        res.send({msg: "post update with successfully"})
    } catch (error) {
        res.status(500).json({msg: "error update: "+error})
    }
}
export const areser = async(req, res)=>{
    try {
        const {id} = req.params

        const event = await findByIdEvetnService(id)

        if(String(event.usuario_id._id) !== re1.userId){
            return res.status(400).send({msg: "you didn't delete this post"})
        }

        await deleteService(id)
        res.send({msg: "post deleted with successfully"})
    } catch (error) {
        res.status(500).json({msg: "error delete: "+error})
    }
}
export const likeEvent = async(req, res)=>{
    try {
        const { id } = req.params
        const userId = req.userId
    
        const eventLiked = await likeEventService(id, userId)
        
        if(!eventLiked){
            await deleteLikeEventService(id, userId)
            res.status(200).json({msg: "like removed successfully"})
        }

    } catch (error) {
        res.status(500).json({msg: "error like: "+error})
    }
}
export const commentEvent = async(req, res)=>{
    try {
        const { idPost } = req.params
        const userid = req.userId
        const {comment} = req.body
    
        if(!comment){
            res.status(400).send({msg:"none comment add"})
        }
    
        await addCommentService(idPost, comment, userid)

        res.send({msg:"menssage add with succesfully"})
    } catch (error) {
        res.status(500).json({msg: "error like: "+error})
    }
}
export const deleteCommentEvent = async(req, res) =>{
    try {
        const { idPost, idComment } = req.params
        const userid = req.userId
    
        const msgDeleted = await deleteCommentService(idPost, idComment, userid)

        const commentFinder = msgDeleted.comentario.find(ctm=> ctm.idComment === idComment)

        if(commentFinder.userId !== userid) res.status(400).send({msg: "you not unathorized to delet this menssage"})

        res.send({msg:"menssage delete with succesfully"})
    } catch (error) {
        res.status(500).json({msg: "error comment: "+error})
    }
}