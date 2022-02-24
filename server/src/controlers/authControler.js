const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config");
const authenticationCheck = require("../../middleware/authMiddleware");

function generateAccessToken(id) {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

const authConroler = {
  Query: {
    getAllUsers: async (parent, args, context, info) => {
      authenticationCheck(context);
      return await User.find();
    },
    getUser: async (parent, args, context, info) => {
      // authenticationCheck(context);
      const id = args.id;
      console.log(await User.findById(id));
      return await User.findById(id);
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const { email, username, password } = args.user;
      const friends = [];
      const candidate = await User.findOne({ email });
      if (candidate) {
        throw new UserInputError("This name is already busy");
      }
      const hashPassword = bcrypt.hashSync(password, 8);
      const user = new User({ email, username, password: hashPassword, friends });
      await user.save();
      return user;
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
