const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    password : {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("User", UserSchema)

