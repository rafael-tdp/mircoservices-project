import express from "express";
import mongoose from "mongoose";
import auth from "./src/router/authRouter.js";
import users from "./src/router/usersRouter.js";
import dotenv from "dotenv";
import graphqlSchema from "./src/graphql/schema/index.js";
import graphqlResolvers from "./src/graphql/resolvers/index.js";
import expressGraphQL from "express-graphql";
import cors from "cors";

const { graphqlHTTP } = expressGraphQL;

const app = express();

// Configurez le middleware CORS pour autoriser les requêtes depuis localhost:4200
app.use(
  cors({
    origin: "http://localhost:4200", // Remplacez par l'URL de votre application Angular
    credentials: true, // Si vous utilisez des cookies ou des en-têtes d'authentification, activez ceci
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

app.listen(3002, () => console.log("Server is running on localhost:3002"));

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

app.use("/auth", auth);
app.use("/users", users);

try {
  await mongoose.connect(process.env.DB_URI);
  console.log("Connected to database");
} catch (e) {
  console.error(e);
}

export default app;