import express from "express";
import { getUserGrades, addUserGrade } from "../routes/gradesRoutes.js";

const router = express.Router();

router.get("/:userId", getUserGrades);
router.post("/:userId", addUserGrade);

export default router;
