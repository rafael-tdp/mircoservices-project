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


  input UserInput {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    role: String!
  }

  type Query {
    users:[User!]
  }

  type Mutation {
    createUser(user:UserInput): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)

export default schema;