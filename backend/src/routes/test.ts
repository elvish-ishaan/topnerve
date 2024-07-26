import express from 'express';
import { createTest, getTest } from '../controllers/test';
const router = express.Router()

router.get('/gettest/:id', getTest);
router.post('/createtest', createTest);


export default router;
