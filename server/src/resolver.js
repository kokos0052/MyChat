const User = require("./models/User");
const bcrypt = require("bcrypt");
const { UserInputError, AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

function generateAccessToken(id) {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

const resolvers = {
  Query: {
    getAllUsers: async () => {
      return await User.find();
    },
    getUser: async (parent, args, context, info) => {
      const id = args.id;
      return await User.findById(id);
    },
    checkAuthorisation: async (parent, args, context, info) => {
      const token = context.auth.split(" ")[1].split(`"`)[0];
      if (!token) {
        throw new AuthenticationError("User not authorizated");
      }
      const decoreData = jwt.verify(token, secret);
      return await User.findById(decoreData.id);
    }
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const { email, username, password } = args.user;
      const candidate = await User.findOne({ email });
      if (candidate) {
        throw new UserInputError("This name is already busy");
      }
      const hashPassword = bcrypt.hashSync(password, 8);
      const user = new User({ email, username, password: hashPassword });
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
      return token;
    },
  },
};

module.exports = resolvers;
