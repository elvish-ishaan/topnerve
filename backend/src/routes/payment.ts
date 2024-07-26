import express from 'express'
import { checkout, paymentVarification } from '../controllers/payment';
const router = express.Router();

router.post('/checkout', checkout)
router.post('/payment-varification', paymentVarification)

export default router