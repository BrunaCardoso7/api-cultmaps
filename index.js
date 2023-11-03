const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser');
// ...
app.use(cors())
app.use(cookieParser());

require("dotenv").config()

require('./conn/conn')

const pictureRoter = require('./routes/picture')
const userRouter = require('./routes/users')

app.use('/users', userRouter)
app.use('/pictures', pictureRoter)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('o servidor está rodando!')
})
