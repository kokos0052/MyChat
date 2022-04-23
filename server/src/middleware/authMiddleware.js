const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req) {
  const token = req.headers.authorization.split(" ")[1];


  if (!token) {
    throw new AuthenticationError("Not authorized, token failed");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return req.user = await User.findById(decoded.id).select("-password");
  } catch (err) {
    throw new AuthenticationError("Not authorized, token failed");
  }
};
