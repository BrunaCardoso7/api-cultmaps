import {Router} from 'express'
import {upload} from'../config/multer.js'

import { create, getAll, topEvents, findById, searchByTitle, byUser, update, areser, likeEvent, commentEvent, deleteCommentEvent } from '../controllers/eventosControllers.js'
import {authMiddleware} from '../middleware/auth.middleware.js'

const router = Router()

router.post("/", authMiddleware, upload.single("file"), create)

router.get("/", getAll)

router.get("/top", topEvents)

router.get("/search", searchByTitle)

router.get("/byUser", authMiddleware, byUser)

router.patch("/:id", authMiddleware, update)
router.delete("/:id", authMiddleware, areser)
router.get("/:id", authMiddleware ,findById)
router.patch("/like/:id", authMiddleware, likeEvent)
router.patch("/comment/:id", authMiddleware, commentEvent)
router.patch("/comment/:idPost/:idcomment", authMiddleware, deleteCommentEvent)
export default router
