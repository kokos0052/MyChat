require("dotenv").config();

const express = require("express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolver");
const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io");
const expressJwt = require("express-jwt");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { applyMiddleware } = require("graphql-middleware");
const cors = require("cors");
const permissions = require("./permissions");

const app = express();
const server = http.createServer(app);
// const io = socketio(server);

const port = 9000 || process.env.PORT;

async function startServer() {
  app.use(
    expressJwt({
      secret: process.env.SECRET,
      algorithms: ["HS256"],
      credentialsRequired: false,
    }).unless({ path: ["/"] }),
    function (err, req, res, next) {
      if (err.code === "invalid_token") {
        return next();
      }
      return next(err);
    }
  );

  const apolloServer = new ApolloServer({
    schema: applyMiddleware(
      makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
      permissions
    ),
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = req.user || null;

      return { user };
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
