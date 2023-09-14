import express from "express";
import mongoose from "mongoose";
import gradesRouter from "./src/router/gradesRouter.js";
import subjectsRouter from "./src/router/subjectsRouter.js";
import dotenv from "dotenv";
import gradesSchema from "./src/graphql/schema/grades/index.js"
import gradeResolver from "./src/graphql/resolvers/grades/index.js"
import expressGraphQL from 'express-graphql';

const { graphqlHTTP } = expressGraphQL;

const app = express();
dotenv.config();

app.use(
    "/graphql",
    graphqlHTTP({
      schema: gradesSchema,
      rootValue: gradeResolver,
      graphiql: true,
    })
  )
  
  app.listen(3003, () => console.log("Server is running on localhost:3003"))

/*app.use(express.json());

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
app.use("/subjects", subjectsRouter);*/

try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database");
} catch (e) {
    console.error(e);
}

export default app;
