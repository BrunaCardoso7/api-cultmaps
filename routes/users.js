const express = require('express')
const router = express.Router()
const multer  = require('multer')
const userControll = require('../controllers/UserControllers')
const upload = multer()

router.post('/', upload.none(), userControll.createUser)

module.exports = router