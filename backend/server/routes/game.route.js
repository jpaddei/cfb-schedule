import express from "express"
import { getGamesByDate, getGamesByRank } from "../controllers/game.controller.js"

const router = express.Router()

router.get("/", getGamesByDate)
router.get("/rank", getGamesByRank)

export default router

