import express from "express";
import { getUserGrades } from "../routes/gradesRoutes.js";

const router = express.Router();
const app = express();

router.get("/grades/:userId", getUserGrades);

export default router;
