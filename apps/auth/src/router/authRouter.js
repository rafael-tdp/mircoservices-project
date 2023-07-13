import express from 'express';
import { register, loginUser, logoutUser } from '../routes/authRoutes.js';

const router = express.Router();
const app = express();

router.use('/register', register);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
