const gql = require("graphql-tag");

module.exports = gql`
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }

  type Mutation {
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
  }
`;
