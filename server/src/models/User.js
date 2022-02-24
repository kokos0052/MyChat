const mongoose = require("mongoose");

const FriendSchema = mongoose.Schema({
  friendID: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
});

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  friends: {
    type: [FriendSchema],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
