import express from 'express';
import { handleSignup, handleLogin, handleLogout, handleGetUser, handleDeleteUser } from '../controllers/UserController.js'
import { authLimiter } from '../middleware/rateLimiter.js'
import { validate, registerValidation, loginValidation } from '../middleware/validation.js'

const router = express.Router();

router.post('/signup', authLimiter, handleSignup);
router.post('/login', authLimiter, validate(loginValidation), handleLogin);
router.post('/logout', handleLogout);
router.get('/getuser', handleGetUser);
router.delete('/deleteUser', handleDeleteUser);

export default router;