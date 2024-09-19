import User from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la récupération des utilisateurs : ${error}`,
        });
    }
};

export const addTeacherInfoToGrades = async (req, res) => {
    try {
        const grades = req.body;

        const gradeIds = grades
            .map((grade) => grade.subject.teacher)
            .filter(Boolean);

        const uniqueTeacherIds = [...new Set(gradeIds)];

        const teachers = await User.find(
            { _id: { $in: uniqueTeacherIds } },
            { password: 0 }
        );

        const teacherMap = {};
        teachers.forEach((teacher) => {
            teacherMap[teacher._id.toString()] = teacher;
        });

        grades.forEach((grade) => {
            if (grade.subject.teacher) {
                const teacherId = grade.subject.teacher.toString();
                grade.subject.teacher = teacherMap[teacherId];
            }
        });

        res.json(grades);
    } catch (error) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la récupération des données du professeur: ${error}`,
        });
    }
};
