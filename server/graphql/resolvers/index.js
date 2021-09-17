const postResolvers = require("./Post");
const commentResolvers = require("./Comment");
const likeResolvers = require("./Like");
const userResolvers = require("./User");

module.exports = [
  postResolvers,
  commentResolvers,
  likeResolvers,
  userResolvers,
];
