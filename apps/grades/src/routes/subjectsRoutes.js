import Subject from "../models/subject.js";

export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la récupération des matières : ${error}`,
        });
    }
};

export const addSubject = async (req, res) => {
    try {
        const { name, coefficient } = req.body;

        const newSubject = new Subject({
            name,
            coefficient,
        });

        await newSubject.save();

        res.json({
            message: "Matière créée avec succès",
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la création de la matière : ${error}`,
        });
    }
};