const express = require('express')
const router = express.Router()
const multer  = require('multer')
const userControll = require('../controllers/UserControllers')
const upload = multer()
const checkToken = require('../config/checkToken')
const cookie = require('cookie')
const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({message: "token não recebido"})
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}

router.post('/register', upload.none(), userControll.createUser)
router.post('/login', upload.none(), userControll.login)
router.get('/user/:id', requireAuth, userControll.Logged)


module.exports = router