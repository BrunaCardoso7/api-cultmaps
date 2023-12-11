import express  from 'express';
const app = express()

import cors from'cors'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
app.use(cors())
app.use(cookieParser());

dotenv.config()


import './conn/conn.js'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import authRouter from './routes/authRouter.js'
import eventsRouter from './routes/eventosRouters.js'
import userRouter from './routes/usersRouters.js'

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/eventos', eventsRouter)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('o servidor está rodando!' + port)
})
