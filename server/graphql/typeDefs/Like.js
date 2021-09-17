const gql = require("graphql-tag");

module.exports = gql`
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type Mutation {
    likePost(postId: ID!): Post!
  }
`;
