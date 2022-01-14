require("dotenv").config();
const express = require("express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolver");
const mongoose = require("mongoose");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const auth = req.headers.authorization || "";
      return { auth };
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: "/gqlplayground" });

  mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
      console.log("successfuly connected to db");
    } else {
      console.log(err);
    }
  });

  app.listen(9000, () => console.log("app work"));
}

startServer();
