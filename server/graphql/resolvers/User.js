const bcrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const dotenv = require("dotenv");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const User = require("../../models/User");
const checkAuth = require("../../utils/checkAuth");

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (user) =>
  jsonWebToken.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

module.exports = {
  Query: {
    getUserProfile: async (_, { username }) => {
      const user = await User.findOne({ username });
      if (!user) {
        return {};
      } else {
        const { _id: id, username, createdAt, email, profileImage, bio } = user;
        return { id, username, createdAt, email, profileImage, bio };
      }
    },
  },
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
        profileImage: "",
        bio: "",
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    login: async (_, { username, password }) => {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    updateUser: async (_, { user }, context) => {
      const { id: userId } = checkAuth(context);
      try {
        const newUser = await User.findByIdAndUpdate(userId, user, {
          new: true,
        });

        const token = generateToken(newUser);
        return {
          ...newUser._doc,
          id: newUser._id,
          token,
        };
      } catch (error) {
        throw new UserInputError("Error", { error });
      }
    },
  },
};
