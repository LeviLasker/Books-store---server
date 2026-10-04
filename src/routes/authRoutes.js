import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegister } from '../middlewares/validators.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/register', validateRegister, register);

router.post('/login', authLimiter, login);

export default router;