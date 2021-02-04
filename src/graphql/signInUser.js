import gql from "graphql-tag"; 

export const SignInUser = (username, password) => gql`
  mutation {
    loginProfile(
      username: "${username}"
      password: "${password}"
    ) {
      status
      message
      data
      redirect
    }
  }
`;