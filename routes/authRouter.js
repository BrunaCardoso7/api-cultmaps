import { Router } from "express";
import { login } from "../controllers/authController.js";
import {upload} from'../config/multer.js'

const router = Router()

router.post('/login', upload.single(),login)

export default router