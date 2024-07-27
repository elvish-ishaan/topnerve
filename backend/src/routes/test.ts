import express from 'express';
import { createTest, getTest, getTestHistory } from '../controllers/test';
const router = express.Router()

router.post('/history', getTestHistory);
router.get('/gettest/:id', getTest);
router.post('/createtest', createTest);


export default router;
