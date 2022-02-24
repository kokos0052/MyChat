const { buildSchema } = require("graphql");

const typeDefs = buildSchema(`
    type Friend {
        friendID: ID
        username: String
    }
    type User {
        id: ID
        email: String
        username: String
        password: String
        friends: [Friend]
    }
    type Message {
        id: ID
        text: String
        userID: ID
    }
    type Conversation {
        id: ID
        participants: [ID]
        messages: [Message]
    }
    type LoginData {
        id: ID
        token: String
    }
    input UserInput {
        email: String!
        username: String
        password: String!
    }
    input MessageInput {
        value: String!
        userID: ID!
    }
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
        checkAuthorisation: User!
    }
    type Mutation {
        createUser(user: UserInput): User
        loginUser(user: UserInput): LoginData
        addFriend(id: ID, friendID: ID): User
        deleteFriend(id: ID, friendID: ID): User
        createConversation(participants: [ID]): Conversation
        sendMessage(message: MessageInput): Message
    }
`);

module.exports = typeDefs;
