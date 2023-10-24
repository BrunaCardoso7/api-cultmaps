const express = require('express')
const router = express.Router()

const upload = require('../config/multer')

const pictureControll = require('../controllers/pictureControllers')

router.post("/", upload.single("file") ,pictureControll.create)
router.get("/", pictureControll.findAll)

module.exports = router
