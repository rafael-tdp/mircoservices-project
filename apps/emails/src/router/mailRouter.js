import express from "express";
import { notify } from "../routes/mailRoutes.js";

const router = express.Router();
const app = express();

router.post("/notify", notify);

export default router;