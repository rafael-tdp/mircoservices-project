import express from "express";
import { addSubject, getSubjects, deleteSubject, updateSubject } from "../routes/subjectsRoutes.js";

const router = express.Router();

router.post("/", addSubject);
router.get("/", getSubjects);
router.patch("/:subjectId", updateSubject);
router.delete("/:subjectId", deleteSubject);

export default router;
