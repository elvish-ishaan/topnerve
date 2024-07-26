import express from 'express'
import { otp } from '../controllers/otp'
const router = express.Router()

//get opt
router.post('/getOtp',otp);

export default router