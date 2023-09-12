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
    }
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;
