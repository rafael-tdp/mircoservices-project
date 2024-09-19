import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    coefficient: {
        type: Number,
        required: true,
        default: 1,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
