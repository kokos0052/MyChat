const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server-express");
const User = require("../models/User");
const generateAccessToken = require("../config/generateAccessToken");



const authConroler = {
  Query: {
    getAllUsers: async (parent, args, context, info) => {
      return await User.find();
    },
    getUser: async (parent, args, { user }, info) => {
      return await User.findById(user.id);
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const { email, username, password } = args.user;
      if (!email || !username || !password) {
        throw new UserInputError("Please enter all fields");
      }
      const candidate = await User.findOne({ email });
      if (candidate) {
        throw new UserInputError("This name is already busy");
      }

      const user = await User.create({
        username,
        email,
        password,
      });
      
      if (!user) {
        throw new UserInputError("Failed creat error");
      }

      return {
        user,
        token: generateAccessToken(user._id),
      };
    },
    loginUser: async (parent, args, context, info) => {
      const { email, password } = args.user;
      const user = await User.findOne({ email });
      if (!user) {
        throw new UserInputError("This user not founded");
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        throw new UserInputError("Wrong password");
      }
      const token = generateAccessToken(user._id);
      const loginData = {
        token,
        id: user._id
      }
      return loginData;
    },
  },
};

module.exports = authConroler;
