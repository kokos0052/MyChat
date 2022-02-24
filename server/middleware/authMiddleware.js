const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (context) {
  const token = context.auth.split(" ")[1];
  // if (!token) {
  //   throw new AuthenticationError("User not authorizated");
  // }
  return jwt.decode(token, secret);
};
