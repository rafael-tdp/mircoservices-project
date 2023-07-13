import express from "express";
import { register, loginUser, logoutUser } from "../routes/authRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
const app = express();

router.use("/register", register);
router.post("/login", authMiddleware, loginUser);
router.post("/logout", authMiddleware, logoutUser);

export default router;
