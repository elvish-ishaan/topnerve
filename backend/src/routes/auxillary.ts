import express from 'express';
import { featReq, talkExpert } from '../controllers/auxillary';
const router = express.Router()

router.post('/talkexpert', talkExpert );
router.post('/featurerequest', featReq )

export default router;