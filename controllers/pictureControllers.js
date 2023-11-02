const Picture = require('../model/picture')

exports.create =  async(req, res)=>{
    try {
        const { name, usuario_id } = req.body
        const file = req.file

        const picture = new Picture({
            nome: req.body.nome, 
            author: req.body.author,
            descricao: req.body.descricao, 
            categoria: req.body.categoria, 
            data: req.body.data, 
            tipo: req.body.tipo,
            localizacao: req.body.localizacao,
            usuario_id,
            name,
            src: file.path
        })
        await picture.save()
        res.redirect('http://127.0.0.1:5501/frontend/index.html')
        // res.status(200).json({msg: "data saved successfully"})
        // return res.redirect('http://127.0.0.1:5502/frontend/index.html')
    } catch (error) {
        res.status(500).json({msg: "Error saving data"})
    }
};

exports.findAll = async(req, res)=>{
    try {
        const pictures = await Picture.find()
        res.json(pictures)
    } catch (error) {
        res.status(404).json({msg: "Image not found"})
    }
}

