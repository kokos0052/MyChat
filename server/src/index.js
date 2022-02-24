require("dotenv").config();
const express = require("express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolver");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const port = 9000;

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
  

  app.use(cors());

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: "/gqlplayground" });

  mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
      console.log("successfuly connected to db");
    } else {
      console.log(err);
    }
  });

  app.listen(port, () => console.log("app work"));
}

startServer();
