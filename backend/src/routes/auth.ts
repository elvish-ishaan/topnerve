import express from 'express';
import { changePassword, login, resetPassword, signup, updatePassword } from '../controllers/user'

const router = express.Router()

//signup route
router.post('/signup', signup)
router.post('/login', login)
router.post('/changepassword', changePassword)
router.post('/resetpassword', resetPassword);
router.post('/resetpassword/:token', updatePassword)

export default router;
