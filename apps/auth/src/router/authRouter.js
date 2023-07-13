import express from "express";
import { register, login, logout } from "../routes/authRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
const app = express();

router.use("/register", register);
router.post("/login", authMiddleware, login);
router.post("/logout", authMiddleware, logout);

export default router;
