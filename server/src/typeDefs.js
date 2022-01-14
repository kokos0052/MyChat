const { buildSchema } = require("graphql");

const typeDefs = buildSchema(`
    type User {
        id: ID
        email: String
        username: String
        password: String
    }
    type Message {
        id: ID
        value: String
        userID: ID
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
        loginUser(user: UserInput): String
    }
`);

module.exports = typeDefs;
