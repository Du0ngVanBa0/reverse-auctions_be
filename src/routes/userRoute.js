const express = require('express');
const userController = require("../controller/userController");

const router = express.Router();

router.post("/register", (req, res) => {
    userController.registerUser(req, res);
});

router.post("/login", (req, res) => {
    userController.loginUser(req, res);
});

router.get("/user/:userId", (req, res) => {
    userController.getUser(req, res);
});

router.get("/validate", (req, res, next) => {
    userController.verifyToken(req, res, next);
});

module.exports = router;