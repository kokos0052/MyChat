const User = require("../models/User");
const { UserInputError } = require("apollo-server-express");
const Conversation = require("../models/Conversation");

const chatConroler = {
  Query: {
    fetchChats: async (parent, args, { user }, info) => {
      const id = user.id;
      let chats = await Conversation.find({
        users: {
          $elemMatch: { $eq: id },
        },
      })
        .populate("users", "-password")
        .populate("latestMessage")
        .populate("groupAdmin", "-password")
        .sort({ updateAt: -1 });
      chats = await User.populate(chats, {
        path: "letestMessage.sender",
        select: "username picture email",
      });
      return chats;
    },
  },
  Mutation: {
    accessChat: async (parent, args, { user }, info) => {
      const userID = args.user;
      const id = user.id;

      let isChat = await Conversation.find({
        idGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: id } } },
          { users: { $elemMatch: { $eq: userID } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage");

      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username picture email",
      });

      if (isChat.length > 0) {
        return isChat[0];
      }

      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [id, userID],
      };

      try {
        const createdChat = await Conversation.create(chatData);

        return await Conversation.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
      } catch (err) {
        throw new Error(err.message);
      }
    },
    createConversation: async (
      parent,
      { participants, chatName },
      { user },
      info
    ) => {
      if ((!participants, !chatName)) {
        throw new UserInputError("Please fill all the fields!");
      }

      if (participants.length < 2) {
        throw new UserInputError(
          "More than 2 users are required to form a group chat"
        );
      }

      const loggedUser = await User.findById(user.id);
      participants.push(loggedUser);

      try {
        const groupChat = await Conversation.create({
          chatName,
          users: participants,
          isGroupChat: true,
          groupAdmin: loggedUser,
        });

        const fullChat = await Conversation.findById(groupChat._id)
          .populate("users", "-password")
          .populate("groupAdmin", "-password");

        console.log(fullChat);

        return fullChat;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    renameConversation: async (parent, { newName, chatId }, { user }, info) => {
      const updatedChat = await Conversation.findByIdAndUpdate(
        chatId,
        {
          chatName: newName,
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (!updatedChat) {
        throw UserInputError("Chat Not Found");
      }

      return updatedChat;
    },
    addParticipant: async (parent, { chatId, userId }, { user }, info) => {
      const updatedChat = await Conversation.findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (!updatedChat) {
        throw new UserInputError("Chat Not Found");
      }

      return updatedChat;
    },
    removeParticipant: async (parent, { chatId, userId }, { user }, info) => {
      console.log(userId, chatId);
      const updatedChat = await Conversation.findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (!updatedChat) {
        throw new UserInputError("Chat Not Found");
      }

      return updatedChat;
    },
  },
};

module.exports = chatConroler;
