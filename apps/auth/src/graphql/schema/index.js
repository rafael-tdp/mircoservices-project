import { buildSchema } from "graphql"

const schema = buildSchema(`

  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    role: String!
  }

  type UserResponse {
    user: User
    message: String
    token: String
  }


  input Register {
    firstname: String
    lastname: String
    email: String
    password: String
    role: String
  }

  input Login {
    email: String
    password: String
  }

  type Query {
    users:[User!]
  }

  type Mutation {
    register(user:Register): UserResponse
    login(user:Login): UserResponse
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)

export default schema;