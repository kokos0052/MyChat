const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        password: String
    }
    type Message {
        id: ID
        value: String
        userID: ID
    }
    input UserInput {
        id: ID
        username: String!
        password: String!
    }
    input MessageInput {
        id: ID
        value: String!
        userID: ID
    }
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }
    type Mutation {
        createUser(input: UserInput): User
    }
`)

module.exports = schema