import express from 'express';
import { registerUser, getUser } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', registerUser);
router.get('/:firebaseUid', protect, getUser);

export default router;