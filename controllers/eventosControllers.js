import { createService, findAllService } from '../services/eventos.services.js'

export const create =  async(req, res)=>{
    try {
        const {nome, author, descricao, categoria, data, localizacao} = req.body
        const usuario_id = req.userId
        const {path: src} = req.file
        
        if(!nome|| !author|| !descricao||!categoria|| !data|| !localizacao){
            res.status(400).send({msg: "inform camp all"})
        }

        const eventoData ={
            nome, 
            author,
            descricao, 
            categoria, 
            data, 
            localizacao,
            usuario_id,
            name: req.body.name,
            src
        }

        const evento = await createService(eventoData)
        
        res.status(200).json({ msg: "Data saved successfully", evento });
    } catch (error) {
        res.status(500).json({msg: "Error saving data "+error})
    }
};

export const getAll = async(req, res)=>{
    try {
        const evento = await findAllService()
        res.json(evento)
    } catch (error) {
        res.status(404).json({msg: "Image not found"})
    }
}
