import express from "express";
import { getUserGrades, addUserGrade } from "../routes/gradesRoutes.js";

const router = express.Router();

router.get("/grades/:userId", getUserGrades);
router.post("/grades/:userId", addUserGrade);

export default router;
