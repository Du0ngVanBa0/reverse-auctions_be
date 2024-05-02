const user = require("../model/user");
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createJWTToken = (us) => {
    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
    return jwt.sign({us}, jwtPrivateKey, {expiresIn: "1d"});
};

const getUserHeader = (req, res, next) => {
    checkJWT(req, res, next);
    const user = jwt.decode(req.headers['authorization']);
    return user;
}

const checkJWT = (req, res, next) => {
    const reqAuthHeader = req.headers['authorization'];
    if (reqAuthHeader !== "undefined") {
        const token = reqAuthHeader;
        try {    
            jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            return next();
        } catch (e) {
            res.status("403").json("Unauthorized!");
        }
    } else {
        res.status("403").json("Unauthorized!");
    }
};

const verifyToken = (req, res, next) => {
    checkJWT(req, res, next);
    res.status("200").json("Authorized")
};

const registerUser = async (req, res) => {
    const {username, email, name, password} = req.body;
    console.log(req.body)
    try {
        if (!username || !name || !email || !password) 
            return res.status(404).json("Tất cả các trường phải được nhập!");
        if (username.length < 7)
            return res.status(404).json("Tên đăng nhập phải có ít nhất 7 kí tự!");
        if (!(/^[a-zA-Z0-9]*$/).test(username))
            return res.status(404).json("Tên đăng nhập không được chứa kí tự đặc biệt!");
        if (name.length < 7)
            return res.status(404).json("Tên hiển thị phải có ít nhất 7 kí tự!");
        if (await user.findOne({username})) 
            return res.status(404).json("Tên đăng nhập đã tồn tại!");
        if (await user.findOne({email})) 
            return res.status(404).json("Email đã tồn tại!");
        if (!validator.isEmail(email))
            return res.status(404).json("Email không hợp lệ!");
        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 }))
            return res.status(404).json("Mật khẩu phải có độ dài hơn 7 kí tự và ít nhất có 1 chữ hoa, 1 chữ thường, 1 số, 1 kí tự đặc biệt");
        const salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        let data = new user({username, email, name, "password": hashPassword});
        await data.save(); 
        delete data.password;
        return res.status(200).json(createJWTToken(data._id));
    } catch (e) {
        console.log(e);
        return res.status(500).json("register err");
    }
};

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        let data = await user.findOne({ username });
        if (!data) 
            return res.status(404).json("Tên đăng nhập không tồn tại!");
        const matchPassword = await bcrypt.compare(password, data.password);  
        if (!matchPassword)
            return res.status(404).json("Mật khẩu không chính xác!");
        delete data.password;
        res.status(200).json(createJWTToken(data));
    } catch (e) {
        console.log(e);
        res.status(500).json("login err");
    }
};

const getUser = async (req, res) => {
    const _id = req.params.userId;
    try {
        const data = await user.findById(_id);
        res.status(200).json(data);
    } catch (e) {
        console.log(e);
        res.status(500).json("get user err");
    }
};

module.exports = {registerUser, loginUser, getUser, verifyToken, checkJWT, getUserHeader};