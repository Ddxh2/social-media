const gql = require("graphql-tag");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    profileImage: String!
    bio: String!
  }

  type UserProfile {
    id: ID!
    email: String!
    username: String!
    createdAt: String!
    profileImage: String!
    bio: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input UpdateUserInput {
    id: ID!
    username: String!
    email: String!
    profileImage: String!
    createdAt: String!
    bio: String!
  }

  type Query {
    getUserProfile(username: String!): UserProfile!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    updateUser(user: UpdateUserInput!): User!
  }
`;
