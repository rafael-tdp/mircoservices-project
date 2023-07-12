import express from 'express';
import { registerUser, loginUser, logoutUser } from '../routes/authRoutes.js';

const router = express.Router();
const app = express();

router.use('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
