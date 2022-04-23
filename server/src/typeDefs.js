const { buildSchema } = require("graphql");

const typeDefs = buildSchema(`
    type User {
        id: ID
        email: String
        username: String
        password: String
        picture: String
        friends: [ID]
    }
    type Message {
        id: ID
        sender: User
        content: String
        chat: Conversation
        readBy: ID
    }
    type Conversation {
        id: ID
        chatName: String
        isGroupChat: Boolean
        users: [User]
        latestMessage: Message
        groupAdmin: User
    }
    type LoginData {
        user: User
        token: String
    }
    input UserInput {
        email: String!
        username: String
        password: String!
    }
    type Query {
        getAllUsers: [User]
        getUser: User
        fetchChats: [Conversation]
        getAllMessages(chatId: ID): [Message]
    }
    type Mutation {
        createUser(user: UserInput): LoginData
        loginUser(user: UserInput): LoginData
        accessChat(user: ID): Conversation
        createConversation(participants: [ID] chatName: String): Conversation
        renameConversation(newName: String chatId: ID): Conversation
        addParticipant(chatId: ID userId: ID): Conversation
        removeParticipant(chatId: ID userId: ID): Conversation
        sendMessage(content: String chatId: ID): Message
    }
`);

module.exports = typeDefs;
