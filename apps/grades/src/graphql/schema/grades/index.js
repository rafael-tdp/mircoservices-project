import { buildSchema } from "graphql"

const gradesSchema = buildSchema(`

    type User {
        _id: String!  
    }

    type Subject {
        _id: String! 
        coefficient: Float!
    }

    type Grade{
        _id: String!
        user: User!
        subject: Subject!
        grade: Float!
    }

    type responseUserGrade{
        _id: String!
        subject: String!
        grades: [Float!]!
        coefficient: Float!
    }

    input GradeInput {
        userId: String!
        subjectId: String!
        grade: Float!
    }

    

    type Query {
        userGrades(userId: ID): [responseUserGrade!]!
    }
    
    type Mutation {
        addUserGrade(grade:GradeInput): Grade
        
    }
    
    schema {
        query: Query
        mutation: Mutation
    }
    

`)

export default gradesSchema;