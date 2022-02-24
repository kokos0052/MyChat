const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  userID: {
    type: String,
    require: true,
  },
});

const ConversationSchema = mongoose.Schema({
  participants: {
    type: [String],
    require: true,
  },
  messages: {
    type: [MessageSchema],
    require: true,
  },
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
