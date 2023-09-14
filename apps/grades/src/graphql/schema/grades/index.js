import { buildSchema } from "graphql"

const gradesSchema = buildSchema(`

    type User {
        _id: ID!  
    }

    type Subject {
        _id: ID! 
    }

    type Grade{
        _id: ID
        user: User
        subject: Subject
        grade: Float
    }

    input GradeInput {
        userId: ID!
        subjectId: ID!
        grade: Float!
    }

    

    type Query {
        userGrades(userId: ID!):[Grade!]
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