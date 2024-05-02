const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    roomId: {type: string},
    userId: {type: string},
    message: {type: String, required: true, minLength: 7, maxLength: 150},
    createdDate: {type: Date, default: Date.now()}
}, {
    timestamps : true,
    _id: false
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;