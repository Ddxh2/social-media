const jsonWebToken = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const { SECRET_KEY } = require("../config");

module.exports = (context) => {
  // context = { ..., headers}
  const authHeader = context.req.headers.authorization;
  if (!!authHeader) {
    // authHeader = "Bearer ..."
    const token = authHeader.split("Bearer ")[1];
    if (!!token) {
      try {
        console.log(token);
        const user = jsonWebToken.verify(token, SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    } else {
      throw new Error("Authentication token must be 'Bearer [token]'");
    }
  } else {
    throw new Error("Authorization header must be provided");
  }
};
