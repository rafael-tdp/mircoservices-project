import Grade from "../models/grade.js";
import { Types } from "mongoose";

export const getUserGrades = async (req, res) => {
    try {
        const userId = req.params.userId;
        // const grades = await Grade.find({ user: new Types.ObjectId(userId) });

        const pipeline = [
            {
                $match: {
                    user: new Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "subjects",
                    localField: "subject",
                    foreignField: "_id",
                    as: "subjectInfo",
                },
            },
            {
                $unwind: "$subjectInfo",
            },
            {
                $group: {
                    _id: "$subjectInfo.name",
                    grades: {
                        $push: "$grade",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    subject: "$_id",
                    grades: 1,
                },
            },
        ];

        const gradesBySubject = await Grade.aggregate(pipeline);

        res.json(gradesBySubject);
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la récupération des notes de l'utilisateur : ${error}`,
        });
    }
};

export const addUserGrade = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { subjectId, grade } = req.body;

        const newGrade = new Grade({
            user: userId,
            subject: subjectId,
            grade: grade,
        });

        await newGrade.save();

        res.json({
            message: "Note ajoutée avec succès",
            grade: newGrade,
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de l'ajout d'une note à l'utilisateur : ${error}`,
        });
    }
};
