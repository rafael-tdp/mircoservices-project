import Grade from "../models/grade.js";
import { Types } from "mongoose";

export const getUserGrades = async (req, res) => {
    try {
        const userId = req.params.userId;
        const grades = await Grade.find({ user: new Types.ObjectId(userId) });
        res.json(grades);
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la récupération des notes de l'utilisateur : ${error}`,
        });
    }
};
