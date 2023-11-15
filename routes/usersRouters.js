import express from'express'
import multer  from'multer'
import { create, findAll, findById, update} from'../controllers/UserControllers.js'
const upload = multer()
const router = express.Router()
// const checkToken from'../config/checkToken')
import { validId, validUser } from '../middleware/global.midleware.js'

router.post('/register', upload.none(), create)
router.get('/users', upload.none(), findAll)
router.get('/:id', validId, validUser, upload.none(),findById)
router.patch('/:id', validId, validUser, upload.none(), update)



export default router