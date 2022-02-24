const authConroler = require("./controlers/authControler");
const chatConroler = require("./controlers/chatControler");

const resolvers = {
  Query: {
    ...authConroler.Query,
    ...chatConroler.Query,
  },
  Mutation: {
    ...authConroler.Mutation,
    ...chatConroler.Mutation,
  },
};

module.exports = resolvers;
