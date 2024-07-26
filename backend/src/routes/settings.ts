import express from 'express';
import { updateProfile } from '../controllers/settings';
import { upload } from '../utils/multer';
const router = express.Router();


//to update user details
router.post('/updateprofile',upload.single('profile'), updateProfile)

export default router;