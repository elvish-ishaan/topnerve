import express from 'express'
import { createschedule, getSchedules } from '../controllers/schedule';
const router = express.Router();

router.get('/getschedules', getSchedules);
router.post('/createschedule', createschedule)

export default router;