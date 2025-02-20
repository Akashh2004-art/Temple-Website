import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

// Auth routes
router.post('/send-otp', AuthController.sendOTP);
router.post('/verify-otp', AuthController.verifyOTP);

export default router;