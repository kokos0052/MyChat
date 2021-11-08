require("dotenv/config");
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const mongoose = require('mongoose');
const app = express();
const users = [{id: 1, username: 'Isa', password: 'Lolka'}]

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
        console.log('successfuly connected to db')
    } else {
        console.log(err);
    }
});

const createUser = (input) => {
    const id = Date.now();
    return {id, ...input}
}

const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => user.id == id)
    },
    createUser: ({input}) => {
        const user = createUser(input);
        users.push(user);
        return user
    }
}

app.use(cors());
app.use(express.json());

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}));

app.listen(9000, () => console.log('app work'));



