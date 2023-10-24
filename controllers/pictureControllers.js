const { fields } = require('../config/multer')
const Picture = require('../model/picture')

exports.create =  async(req, res)=>{
    try {
        const { name } = req.body
        const file = req.file

        const picture = new Picture({
            name,
            src: file.path
        })
        await picture.save()
        res.status(200).json({msg: "image saved successfully"})
    } catch (error) {
        res.status(500).json({msg: "Error saving image"})
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