const express = require('express')
const router = express.Router()
const multer  = require('multer')
const userControll = require('../controllers/UserControllers')
const upload = multer()
const checkToken = require('../config/checkToken')


router.get('/user/:id', checkToken, userControll.Logged)
router.post('/register', upload.none(), userControll.createUser)
router.post('/login', upload.none(), userControll.login)


module.exports = router