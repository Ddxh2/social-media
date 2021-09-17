const jsonWebToken = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const dotenv = require("dotenv");

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (context) => {
  // context = { ..., headers}
  const authHeader = context.req.headers.authorization;
  if (!!authHeader) {
    // authHeader = "Bearer ..."
    const token = authHeader.split("Bearer ")[1];
    if (!!token) {
      try {
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
