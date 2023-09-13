import express from "express";
import { addSubject, getSubjects } from "../routes/subjectsRoutes.js";

const router = express.Router();

router.post("/", addSubject);
router.get("/", getSubjects);

export default router;
