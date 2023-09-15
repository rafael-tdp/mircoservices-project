import Grade from "../../../models/grade.js"
import { Types } from "mongoose";

const gradeResolver = {
    userGrades: async (_,{userId}) => {
        try {
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
                        coefficient: {
                            $first: "$subjectInfo.coefficient", // Extrayez le coefficient du premier document du groupe
                            },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        subject: "$_id",
                        grades: 1,
                        coefficient: 1,
                    },
                },
            ];
            const gradesBySubject = await Grade.aggregate(pipeline);
            return gradesBySubject;
        } catch (error) {
            throw new Error(`Une erreur est survenue lors de la récupération des notes de l'utilisateur : ${error}`);
        }
    },
    addUserGrade: async args => {}

}

export default gradeResolver;
