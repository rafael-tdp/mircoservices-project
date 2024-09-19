import { gql } from 'apollo-angular'

// const LOGIN = gql`
//   query {
//     login {
//       id
//       name
//       description
//     }
// //   }
// `

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(user:{email: $email, password: $password}) {
      user {
        _id
        firstname
        lastname
      }
      token
    }
  }
`

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
  `

export { LOGIN }