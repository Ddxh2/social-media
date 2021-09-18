import gql from "graphql-tag";

export const GET_USER_PROFILE = gql`
  query getUserProfile($username: String!) {
    getUserProfile(username: $username) {
      id
      email
      username
      profileImage
      bio
      createdAt
    }
  }
`;

export const GET_USER_PROFILE_IMAGE = gql`
  query getUserProfileImage($username: String!) {
    getUserProfile(username: $username) {
      profileImage
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
      createdAt
      profileImage
      bio
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
      profileImage
      bio
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      email
      username
      token
      createdAt
      profileImage
      bio
    }
  }
`;
