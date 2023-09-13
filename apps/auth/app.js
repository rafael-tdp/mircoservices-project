import express from "express";
import mongoose from "mongoose";
import auth from "./src/router/authRouter.js";
import dotenv from "dotenv";
import graphqlSchema from "./src/graphql/schema/index.js"
import graphqlResolvers from "./src/graphql/resolvers/index.js"
import expressGraphQL from 'express-graphql';

const { graphqlHTTP } = expressGraphQL;

const app = express();
app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      graphiql: true,
    })
  )
  
  app.listen(3001, () => console.log("Server is running on localhost:3000"))

dotenv.config();

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

app.use("/auth", auth);*/


try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database");
} catch (e) {
    console.error(e);
}

export default app;


