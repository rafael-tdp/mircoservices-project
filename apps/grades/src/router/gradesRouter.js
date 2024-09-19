import express from "express";
import { getUserGrades, addUserGrade, deleteUserGrade, updateUserGrade } from "../routes/gradesRoutes.js";

const router = express.Router();

router.get("/:userId", getUserGrades);
router.post("/:userId", addUserGrade);
router.patch("/:gradeId", updateUserGrade);
router.delete("/:gradeId", deleteUserGrade);

export default router;
