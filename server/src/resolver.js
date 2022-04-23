const authConroler = require("./controlers/authControler");
const chatConroler = require("./controlers/chatControler");
const messageConroler = require("./controlers/messageControler");

const resolvers = {
  Query: {
    ...authConroler.Query,
    ...chatConroler.Query,
    ...messageConroler.Query,
  },
  Mutation: {
    ...authConroler.Mutation,
    ...chatConroler.Mutation,
    ...messageConroler.Mutation,
  },
};

module.exports = resolvers;
