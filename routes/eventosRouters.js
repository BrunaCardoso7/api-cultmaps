import {Router} from 'express'
import {upload} from'../config/multer.js'

import { create, getAll } from '../controllers/eventosControllers.js'
import {authMiddleware} from '../middleware/auth.middleware.js'
const router = Router()

router.post("/", authMiddleware , upload.single("file"), create)
router.get("/", getAll)

export default router
