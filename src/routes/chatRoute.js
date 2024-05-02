const express = require('express');
const chatController = require("../controller/chatController");

const router = express.Router();

router.post("/", (req, res, next) => {
    chatController.createChat(req, res, next);
});

module.exports = router;