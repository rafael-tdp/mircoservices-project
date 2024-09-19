import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
});

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
