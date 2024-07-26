import express from 'express'
import { getRankers } from '../controllers/leaderboard'
const router = express.Router()

router.get('/ranker', getRankers)

export default router