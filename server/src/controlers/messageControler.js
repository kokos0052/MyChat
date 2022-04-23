const Message = require("../models/Message");
const { UserInputError } = require("apollo-server-express");
const Conversation = require("../models/Conversation");
const User = require("../models/User");

const chatControler = {
  Query: {
    getAllMessages: async (parent, { chatId }, { user }, info) => {
      try {
        const messages = await Message.find({ chat: chatId })
          .populate("sender", "username picture email")
          .populate("chat");

        return messages;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Mutation: {
    sendMessage: async (parent, { content, chatId }, { user }, info) => {
        if (!content || !chatId) {
            throw new UserInputError("Invalid data passed into request");
        }

        const newMessage = {
            sender: user.id,
            content,
            chat: chatId,
        };

        try {
          let message = await Message.create(newMessage)

          message = await message.populate("sender", "username email picture");
          message = await message.populate("chat");
          message = await User.populate(message, {
              path: "chat.users",
              select: "username email picture"
          });

          await Conversation.findByIdAndUpdate(chatId, { latestMessage: message });

          return message;
        } catch (err) {
            throw new Error(err.message);
        }

    }
  },
};

module.exports = chatControler;