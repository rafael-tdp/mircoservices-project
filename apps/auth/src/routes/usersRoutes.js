import User from "../models/user.js";

export const addTeacherInfoToGrades = async (req, res) => {
    try {
        const grades = req.body.gradesArray;
        console.log(grades);

        const gradeIds = grades
            .map((grade) => grade.subject.teacher)
            .filter(Boolean);
        console.log(gradeIds);

        const uniqueTeacherIds = [...new Set(gradeIds)];
        console.log(uniqueTeacherIds);

        const teachers = await User.find(
            { _id: { $in: uniqueTeacherIds } },
            { password: 0 }
        );
        console.log(teachers);

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
