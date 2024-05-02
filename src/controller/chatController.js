const user = require("../model/user");
const jwt = require('jsonwebtoken');
const userController = require("./userController");

const createChat = async (req, res, next) => {
    const user = userController.getUserHeader(req, res, next);
    console.log(user);
    return res.status("200").json("OK")
}

module.exports = {createChat};