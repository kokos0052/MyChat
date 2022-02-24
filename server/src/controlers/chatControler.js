const { User } = require("../models/User");
const authenticationCheck = require("../../middleware/authMiddleware");
const { UserInputError } = require("apollo-server-express");
const Conversation = require("../models/Conversation");

const chatConroler = {
  Query: {},
  Mutation: {
    addFriend: async (parent, args, context, info) => {
      const userID = args.id;
      const friendID = args.friendID;
      const candidateToFriend = await User.findById(friendID);
      if (!candidateToFriend) {
        throw new UserInputError("This user does note exist");
      }
      const user = await User.findById(userID);
      const friend = {
        friendID: candidateToFriend.friendID,
        username: candidateToFriend.username,
      };

      user.friends.forEach((buddy) => {
        if (buddy.friendID === friendID) {
          throw new UserInputError("This user already has been added");
        }
      });

      user.friends = [...user.friends, friend];

      await user.save();
      return user;
    },
    deleteFriend: async (parent, args, context, info) => {
      const userID = args.id;
      const friendID = args.id;
      const user = await User.findById(userID);
      const friend = user.friends.findIndex((el) => el.friendID === friendID);
      user.friends.splice(friend, 1);

      await user.save();
      return user;
    },
    createConversation: async (parent, args, context, info) => {
      const participants = args.participants;
      if (participants.length < 2) {
        throw new UserInputError("You should add more users for creating conversation");
      }
      const conversation = await new Conversation({
        participants,
        messages: [],
      })

      return conversation;
    },
  },
};

module.exports = chatConroler;
