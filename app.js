const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

require("dotenv").config()

require('./conn/conn')

const pictureRoter = require('./routes/picture')

app.use('/pictures', pictureRoter)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('o servidor está rodando!')
})
