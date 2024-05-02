const express = require('express');
const app = express();
const db = require("./src/data/database");
const userRoute = require("./src/routes/userRoute");
const chatRoute = require("./src/routes/chatRoute");
// Loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();
// HTTP logger
var morgan = require('morgan');
app.use(morgan('combined'));  
// cors
const cors = require('cors');
app.use(cors());
// Parse incoming JSON data from HTTP requests
app.use(express.json());
// Config route
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send("welcome to website")
});
db.connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  });
})