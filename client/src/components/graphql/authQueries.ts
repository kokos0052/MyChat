import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($user: UserInput) {
    loginUser(user: $user) {
      token
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput) {
    createUser(user: $user) {
      id
      email
      username
      password
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID) {
    getUser(id: $id) {
      email
      username
    }
  }
`