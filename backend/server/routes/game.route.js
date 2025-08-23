import express from "express"
import { getGamesByDate } from "../controllers/game.controller.js"

const router = express.Router()

router.get("/", getGamesByDate)

export default router

