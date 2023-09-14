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

export const deleteSubject = async (req, res) => {
    try {
        const subjectId = req.params.subjectId;

        await Subject.findOneAndDelete({
            _id: subjectId,
        });

        res.json({
            message: "Matière supprimée avec succès",
        });
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la suppression de la matière : ${error}`,
        });
    }
};

export const updateSubject = async (req, res) => {
    try {
        const subjectId = req.params.subjectId;
        const { name, coefficient, teacher } = req.body;
        
        const updateQuery = {};
        if (name) {
            updateQuery.name = name;
        }
        if (coefficient) {
            updateQuery.coefficient = coefficient;
        }
        if (teacher) {
            updateQuery.teacher = teacher;
        }

        await Subject.findOneAndUpdate(
            {
                _id: subjectId,
            },
            updateQuery
        );
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la mise à jour de la matière : ${error}`,
        });
    }
};
