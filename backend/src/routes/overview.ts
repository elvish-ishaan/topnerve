import express from 'express'
import { getPerformance } from '../controllers/overview';
const router = express.Router()

router.post('/getPerfCurve', getPerformance)

export default router;