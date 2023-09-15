import { Types } from "mongoose";
import Grade from "../models/grade.js";
import axios from 'axios';

export const getUserGrades = async (req, res) => {
    try {
        const userId = req.params.userId;

        const gradesBySubject = await Grade.aggregate([
            {
                $match: { user: new Types.ObjectId(userId) }, // Filtrez les notes pour un utilisateur spécifique
            },
            {
                $group: {
                    _id: "$subject", // Regroupez par le champ "subject"
                    grades: { $push: "$grade" }, // Créez un tableau de notes
                },
            },
            {
                $lookup: {
                    from: "subjects", // Le nom de la collection "subjects"
                    localField: "_id",
                    foreignField: "_id",
                    as: "subjectData",
                },
            },
            {
                $unwind: "$subjectData", // Déroulez le tableau "subjectData" créé par la jointure
            },
            {
                $project: {
                    subject: "$subjectData", // Renommez "_id" en "subject"
                    grades: 1, // Incluez le tableau de notes
                },
            },
        ]);

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

        const userG = await User.findById(userId);
        const userEmail = userG.email;


        const emailTo = {
            to: userEmail, // Remplacez par l'e-mail de l'utilisateur concerné
        };

        await axios.post('http://localhost:3000/send-email', emailTo);


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

export const deleteUserGrade = async (req, res) => {
    try {
        const gradeId = req.params.gradeId;

        await Grade.findOneAndDelete({
            _id: gradeId,
        });

        res.json({
            message: "Note supprimée avec succès",
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la suppression d'une note de l'utilisateur : ${error}`,
        });
    }
};

export const updateUserGrade = async (req, res) => {
    try {
        const gradeId = req.params.gradeId;
        const { grade } = req.body;

        const updateQuery = {};
        if (grade) {
            updateQuery.grade = grade;
        }

        await Grade.findOneAndUpdate(
            {
                _id: gradeId,
                user: userId,
            },
            updateQuery
        );

        res.json({
            message: "Note modifiée avec succès",
        });
        
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la modification d'une note de l'utilisateur : ${error}`,
        });
    }
};
