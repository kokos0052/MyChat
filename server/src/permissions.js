const { rule, shield, not } = require("graphql-shield");

const isAuthorizated = rule()((parent, args, { user }) => {
  return user !== null;
});

module.exports = shield({
  Query: {
    getUser: isAuthorizated,
    getAllUsers: isAuthorizated,
    fetchChats: isAuthorizated,
    getAllMessages: isAuthorizated,
  },
  Mutation: {
    createUser: not(isAuthorizated),
    loginUser: not(isAuthorizated),
    accessChat: isAuthorizated,
    createConversation: isAuthorizated,
    renameConversation: isAuthorizated,
    addParticipant: isAuthorizated,
    removeParticipant: isAuthorizated,
    sendMessage: isAuthorizated,
  }
});
