import express from "express";
import mongoose from "mongoose";
import gradesRouter from "./src/router/gradesRouter.js";
import subjectsRouter from "./src/router/subjectsRouter.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use("/grades", gradesRouter);
app.use("/subjects", subjectsRouter);

try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database");
} catch (e) {
    console.error(e);
}

export default app;
