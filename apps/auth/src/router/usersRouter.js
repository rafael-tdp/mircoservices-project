import express from "express";
import { addTeacherInfoToGrades } from "../routes/usersRoutes.js";

const router = express.Router();

router.post("/addTeacherInfoToGrades", addTeacherInfoToGrades);

export default router;
