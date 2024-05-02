const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, minLength: 7},
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true,  minLength: 7},
    password: {type: String, required: true, minLength: 8}
}, {
    timestamps : true
});

const User = mongoose.model("User", userSchema);

module.exports = User;