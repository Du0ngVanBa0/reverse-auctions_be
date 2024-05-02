const mongoose = require('mongoose');
// Loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected successfully!');
    } catch(e) { 
        console.log("--DB Connection error: " + e);
        process.exit(0);
    };
};

module.exports = {connectDb};