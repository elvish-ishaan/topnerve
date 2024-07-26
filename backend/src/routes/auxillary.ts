import express from 'express';
import { talkExpert } from '../controllers/auxillary';
const router = express.Router()

router.post('/talkexpert', talkExpert )

export default router;